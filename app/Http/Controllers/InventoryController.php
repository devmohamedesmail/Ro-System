<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInventoryItemRequest;
use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InventoryController extends Controller
{
    //
    public function inventory_page()
    {
        $auth = Auth::user();
        $stations = $auth->stations->load('inventory');
        return Inertia::render("inventory/index", [
            'stations' => $stations
        ]);
    }


    public function store_inventory(StoreInventoryItemRequest $request)
    {

        $inventory = new InventoryItem();
        $inventory->name = $request->name;
        $inventory->code = $request->code;
        $inventory->type = $request->type;
        $inventory->unit = $request->unit;
        $inventory->description = $request->description;
        $inventory->inventory_id = $request->inventory_id;
        $inventory->save();
        return redirect()->back();
        // $inventory = InventoryService::store($request);
        // return back()->with('success', 'Inventory created successfully');
    }
}