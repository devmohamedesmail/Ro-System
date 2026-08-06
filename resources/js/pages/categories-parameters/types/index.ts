export type ParameterInputType = 'NUMBER' | 'TEXT' | 'BOOLEAN';
export type UsageType = 'READING' | 'DAILY_REPORT' | 'BOTH';

export interface ReadingParameter {
    id: number;
    reading_category_id: number;
    company_id?: number | null;
    ro_unit_id?: number | null;
    ro_unit_reading_category_id?: number | null;
    name: string;
    code?: string | null;
    unit?: string | null;
    input_type: ParameterInputType;
    usage: UsageType;
    track_difference: boolean;
    min_value?: number | null;
    max_value?: number | null;
    order: number;
    is_required: boolean;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface ReadingCategory {
    id: number;
    company_id?: number | null;
    name: string;
    code?: string | null;
    icon?: string | null;
    is_system: boolean;
    is_active: boolean;
    order: number;
    usage: UsageType;
    parameters?: ReadingParameter[];
    created_at?: string;
    updated_at?: string;
}
