import React from 'react';
import { createSearchCondition, SearchCondition } from '../../types/SearchCondition';
import { toProperCase } from '../../utils/textManip';
import 'reflect-metadata'; 

interface FiltersProps<T> {
    classType: new () => T; // Constructor type for the class
    filters: SearchCondition[];
    onFiltersChange: (filters: SearchCondition[]) => void;
}

const Filters = <T extends Record<string, any>>({ classType, filters, onFiltersChange }: FiltersProps<T>) => {
    const handleFilterChange = (
        index: number,
        field: Exclude<keyof SearchCondition, 'allowEdit'>,
        value: string
    ) => {
        const updatedFilters = [...filters];
        const currentField = updatedFilters[index].field;

        if (field === 'field') {
            const selectedType = typeof new classType()[value as keyof T];

            if (selectedType === 'number' || selectedType === 'bigint') {
                updatedFilters[index].comparison = 'greaterThan';
            } else if (Array.isArray(new classType()[value as keyof T])) {
                updatedFilters[index].comparison = 'contains';
            } else {
                updatedFilters[index].comparison = 'contains';
            }

            updatedFilters[index].field = value;
        } else {
            updatedFilters[index][field] = value;
        }

        onFiltersChange(updatedFilters);
    };

    const addFilter = () => {
        onFiltersChange([...filters, createSearchCondition('name', '', 'contains')]);
    };

    const removeFilter = (index: number) => {
        const updatedFilters = filters.filter((_, i) => i !== index);
        onFiltersChange(updatedFilters);
    };

    const getComparisonOptions = (field: string) => {
        const selectedType = typeof new classType()[field as keyof T];

        if (selectedType === 'number' || selectedType === 'bigint') {
            return (
                <>
                    <option value="lessThan">&le;</option>
                    <option value="equals">=</option>
                    <option value="greaterThan">&ge;</option>
                </>
            );
        } else if (Array.isArray(new classType()[field as keyof T]) || selectedType === 'string') {
            return (
                <>
                    <option value="contains">=</option>
                    <option value="notContains">!=</option>
                </>
            );
        }
        return null;
    };
    

    const getFilteredKeys = () => {
        const instance = new classType();
        return Object.keys(instance).filter(
            (key) => !Reflect.getMetadata('ignoreFilter', instance, key) // Exclude keys with 'ignoreFilter' metadata
        );
    };

    return (
        <div className="filters-container">
            {filters.map((filter, index) => (
                <div key={index} className="filter-row">
                    <select
                        value={filter.field}
                        onChange={(e) => handleFilterChange(index, 'field', e.target.value)}
                    >
                        {getFilteredKeys().map((key) => (
                            <option key={key} value={key}>
                                {toProperCase(key)}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filter.comparison}
                        onChange={(e) => handleFilterChange(index, 'comparison', e.target.value)}
                    >
                        {getComparisonOptions(filter.field)}
                    </select>

                    <input
                        type="text"
                        value={filter.value}
                        onChange={(e) => handleFilterChange(index, 'value', e.target.value)}
                    />

                    {index === 0 ? (
                        <button onClick={addFilter}>+</button>
                    ) : (
                        <button onClick={() => removeFilter(index)}>&times;</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Filters;
