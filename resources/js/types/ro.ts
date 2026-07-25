export interface Parameter {
    id: number;
    name: string;
    code: string | null;
    unit: string | null;
    input_type: 'NUMBER' | 'TEXT' | 'BOOLEAN';
    min_value: number | null;
    max_value: number | null;
    order: number;
    is_required: boolean;
    is_active: boolean;
}

export interface Category {
    id: number;
    name: string;
    order: number;
    is_system: boolean;
    parameters: Parameter[];
    pivot?: { is_active: boolean; order: number };
}

export interface RoUnit {
    id: number;
    name: string;
    code: string;
    reading_categories: Category[];
}
