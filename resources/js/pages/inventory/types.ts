// ─── Inventory Domain Types ───────────────────────────────────────────────────

export interface InventoryItem {
    id: number;
    inventory_id: number;
    name: string;
    code: string | null;
    type: string;
    unit: string;
    quantity: number;
    minimum_quantity: number;
    description: string | null;
    created_at: string;
    updated_at: string;
}

export interface Inventory {
    id: number;
    company_id: number;
    station_id: number;
    name: string;
    description: string | null;
    created_at: string;
    updated_at: string;
    items: InventoryItem[];
}

export interface Station {
    id: number;
    company_id: number;
    name: string;
    slug: string;
    code: string;
    phone: string | null;
    address: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    inventory: Inventory;
}
