export interface SearchCondition {
    field: string;
    value: string;
    comparison: string;
    allowEdit: boolean;
};

export function createSearchCondition(
    field: string, 
    value: string, 
    comparison: string, 
    allowEdit: boolean = true
): SearchCondition {
    return { field, value, comparison, allowEdit };
}