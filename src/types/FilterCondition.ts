export interface FilterCondition {
    field: string;
    fieldType: string;
    comparison: 'contains' | 'notContains' | 'greaterThan' | 'lessThan' | 'equals';
    value: string | number;
}