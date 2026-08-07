<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInventoryItemRequest;
use App\Http\Requests\UpdateInventoryItemRequest;
use App\Models\InventoryItem;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InventoryController extends Controller
{
    //
    public function inventory_page()
    {
        $auth = Auth::user();
        $stations = $auth->stations->load('inventory.items');

        return Inertia::render('inventory/index', [
            'stations' => $stations,
        ]);
    }

    public function store_inventory(StoreInventoryItemRequest $request)
    {

        $inventory = new InventoryItem;
        $inventory->name = $request->name;
        $inventory->code = $request->code;
        $inventory->type = $request->type;
        $inventory->unit = $request->unit;
        $inventory->quantity = $request->quantity;
        $inventory->description = $request->description;
        $inventory->inventory_id = $request->inventory_id;
        $inventory->save();

        return redirect()->back();
    
    }


    public function update_inventory(UpdateInventoryItemRequest $request,$id){
        $inventory =  InventoryItem::findOrFail($id);
        $inventory->name = $request->name;
        $inventory->code = $request->code;
        $inventory->type = $request->type;
        $inventory->unit = $request->unit;
        $inventory->quantity = $request->quantity;
        $inventory->description = $request->description;
        $inventory->inventory_id = $request->inventory_id;
        $inventory->save();
        return redirect()->back();
    }
}