<?php

namespace App\Services;

use App\Models\InventoryItem;
use App\Models\InventoryTransaction;
use App\Models\MaterialReceivingForm;
use App\Models\MaterialReceivingItem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MRFService
{
    /**
     * Get all Material Receiving Forms with items and workflow users.
     */
    public function getMaterialReceivingForms(): Collection
    {
        return MaterialReceivingForm::query()
            ->with([
                'items',
                'receivedBy:id,name,email',
                'reviewedBy:id,name,email',
                'requestedBy:id,name,email',
                'approvedBy:id,name,email',
            ])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Create a new Material Receiving Form and INCREASE station inventory stock.
     */
    public function storeMRF(Request $request): MaterialReceivingForm
    {
        return DB::transaction(function () use ($request) {
            $user = Auth::user();

            // Generate unique form number if not provided
            $formNumber = $request->form_number;
            if (empty($formNumber)) {
                $count = MaterialReceivingForm::count() + 1;
                $formNumber = 'MRF-' . date('Ymd') . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);
            }

            // Create Material Receiving Form Header
            $form = MaterialReceivingForm::create([
                'form_number' => $formNumber,
                'location' => $request->location,
                'from_plant' => $request->from_plant,
                'store_location' => $request->store_location,
                'from_date' => $request->from_date ?: now(),
                'to_date' => $request->to_date ?: now(),
                'remarks' => $request->remarks,
                'received_by' => $request->received_by ?: $user?->id,
                'reviewed_by' => $request->reviewed_by ? (int) $request->reviewed_by : null,
                'requested_by' => $request->requested_by ? (int) $request->requested_by : null,
                'approved_by' => $request->approved_by ? (int) $request->approved_by : null,
                'operator' => $request->operator,
                'area_supervisor' => $request->area_supervisor,
                'department' => $request->department,
                'department_head' => $request->department_head,
                'distribution_original' => $request->distribution_original,
                'distribution_green' => $request->distribution_green,
                'distribution_red' => $request->distribution_red,
            ]);

            // Save form items & increase inventory stock
            if ($request->has('items') && is_array($request->items)) {
                foreach ($request->items as $index => $itemData) {
                    $inventoryItemId = $itemData['inventory_item_id'] ?? null;
                    $quantityReceived = (float) ($itemData['quantity'] ?? 0);

                    if ($quantityReceived > 0) {
                        $inventoryItem = $inventoryItemId ? InventoryItem::find($inventoryItemId) : null;

                        if ($inventoryItem) {
                            // INCREASE quantity in the station's inventory stock
                            $inventoryItem->quantity = (float) $inventoryItem->quantity + $quantityReceived;
                            $inventoryItem->save();

                            // Record Inventory Transaction log ('in')
                            InventoryTransaction::create([
                                'inventory_item_id' => $inventoryItem->id,
                                'user_id' => $user?->id,
                                'type' => 'in',
                                'quantity' => $quantityReceived,
                                'notes' => 'MRF Received: ' . $form->form_number,
                            ]);
                        }

                        // Create MRF Item Record
                        MaterialReceivingItem::create([
                            'material_receiving_form_id' => $form->id,
                            'serial_number' => $index + 1,
                            'item_code' => $inventoryItem?->code ?? $itemData['item_code'] ?? null,
                            'material_description' => $inventoryItem?->name ?? $itemData['material_description'] ?? null,
                            'part_serial_number' => $itemData['part_serial_number'] ?? null,
                            'valuation_type' => $itemData['valuation_type'] ?? null,
                            'bin_location' => $itemData['bin_location'] ?? null,
                            'unit' => $inventoryItem?->unit ?? $itemData['unit'] ?? 'piece',
                            'quantity' => $quantityReceived,
                            'sto_pro_no' => $itemData['sto_pro_no'] ?? null,
                            'invoice_no' => $itemData['invoice_no'] ?? null,
                        ]);
                    }
                }
            }

            return $form;
        });
    }
}
