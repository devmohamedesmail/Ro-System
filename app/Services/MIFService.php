<?php

namespace App\Services;

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Models\MaterialIssuingForm;
use App\Models\MaterialIssuingItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MIFService
{
    /**
     * Get all Material Issuing Forms with items, stations, and users.
     */
    public function getMaterialIssuingForms(): Collection
    {
        $user = Auth::user();
        $stationIds = $user ? $user->stations()->pluck('stations.id') : [];

        return MaterialIssuingForm::query()
            ->with([
                'items.station:id,name,code',
                'issuedBy:id,name,email',
                'recievedBy:id,name,email',
            ])
            ->whereHas('items', function ($query) use ($stationIds) {
                $query->whereIn('station_id', $stationIds);
            })
            ->orWhereDoesntHave('items') // include forms without items yet
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Create a new Material Issuing Form and decrease station inventory items quantity.
     */
    public function storeMIF(Request $request): MaterialIssuingForm
    {
        return DB::transaction(function () use ($request) {
            $user = Auth::user();
            $companyId = $user?->company_id ?? 1;

            // Generate unique form number if not provided
            $formNumber = $request->form_number;
            if (empty($formNumber)) {
                $count = MaterialIssuingForm::count() + 1;
                $formNumber = 'MIF-' . date('Ymd') . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);
            }

            // Create Material Issuing Form header
            $form = MaterialIssuingForm::create([
                'form_number' => $formNumber,
                'from_location' => $request->from_location,
                'store_location' => $request->store_location,
                'from_date' => $request->from_date ?: now(),
                'to_date' => $request->to_date ?: now(),
                'is_transfer' => $request->boolean('is_transfer', false),
                'is_maintenance_direct_issue' => $request->boolean('is_maintenance_direct_issue', false),
                'remarks' => $request->remarks,
                'issued_by' => $request->issued_by ?: $user?->id,
                'recieved_by' => $request->recieved_by ? (int) $request->recieved_by : null,
            ]);

            // Save form items & update inventory stock
            if ($request->has('items') && is_array($request->items)) {
                foreach ($request->items as $index => $itemData) {
                    $inventoryItemId = $itemData['inventory_item_id'] ?? null;
                    $quantityIssued = (float) ($itemData['quantity'] ?? 0);
                    $stationId = $itemData['station_id'] ?? $request->station_id ?? null;

                    if ($inventoryItemId && $quantityIssued > 0) {
                        $inventoryItem = InventoryItem::find($inventoryItemId);

                        if ($inventoryItem) {
                            $currentBalance = (float) $inventoryItem->quantity;
                            $balanceAfter = max(0, $currentBalance - $quantityIssued);

                            // Create MIF Item record
                            MaterialIssuingItem::create([
                                'company_id' => $companyId,
                                'station_id' => $stationId,
                                'material_issue_form_id' => $form->id,
                                'serial_number' => $index + 1,
                                'item_code' => $inventoryItem->code ?? $itemData['item_code'] ?? null,
                                'valuation_type' => $itemData['valuation_type'] ?? null,
                                'material_description' => $inventoryItem->name ?? $itemData['material_description'] ?? null,
                                'pm_order' => $itemData['pm_order'] ?? null,
                                'unit' => $inventoryItem->unit ?? $itemData['unit'] ?? 'piece',
                                'balance' => $currentBalance,
                                'quantity' => $quantityIssued,
                                'balance_after' => $balanceAfter,
                            ]);

                            // Decrease quantity from the station's inventory
                            $inventoryItem->quantity = $balanceAfter;
                            $inventoryItem->save();

                            // Record Inventory Transaction log
                            InventoryTransaction::create([
                                'inventory_item_id' => $inventoryItem->id,
                                'user_id' => $user?->id,
                                'type' => 'out',
                                'quantity' => $quantityIssued,
                                'notes' => 'MIF Issued: ' . $form->form_number,
                            ]);
                        }
                    }
                }
            }

            return $form;
        });
    }
}
