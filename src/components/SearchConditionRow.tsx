import React from 'react';
import { SearchCondition } from '../types/SearchCondition';

interface SearchConditionRowProps {
    searchConditions: SearchCondition[];
    onConditionsChange: (conditions: SearchCondition[]) => void;
}

const SearchConditionRow: React.FC<SearchConditionRowProps> = ({ searchConditions, onConditionsChange }) => {
    const handleConditionChange = (index: number, field: keyof SearchCondition, value: string) => {
        const updatedConditions = [...searchConditions];
        const currentField = updatedConditions[index].field;
    
        if (field === 'field') {
            // Only update comparison if the field changes to or from 'level'
            if (value === 'level' && currentField !== 'level') {
                updatedConditions[index].comparison = 'greaterThan'; // Default to >= when changing to level
            } else if (currentField === 'level' && value !== 'level') {
                updatedConditions[index].comparison = 'contains'; // Default to = when changing from level to another field
            }
    
            updatedConditions[index].field = value as SearchCondition['field'];
        } else {
            // For other changes, just update the specified field or comparison directly
            updatedConditions[index][field] = value;
        }
    
        onConditionsChange(updatedConditions); // Notify parent of the change
    };

    const addCondition = () => {
        onConditionsChange([...searchConditions, { field: 'name', value: '', comparison: 'contains' }]);
    };

    const removeCondition = (index: number) => {
        const updatedConditions = searchConditions.filter((_, i) => i !== index);
        onConditionsChange(updatedConditions); // Notify parent of the change
    };

    return (
        <div className="search-bar-container">
            {searchConditions.map((condition, index) => (
                <div key={index} className="search-condition">
                    <select className='search-condition' value={condition.field} onChange={(e) => handleConditionChange(index, 'field', e.target.value)}>
                        <option value="name">Name</option>
                        <option value="traits">Traits</option>
                        <option value="description">Description</option>
                        <option value="level">Level</option>
                    </select>

                    <select className='search-condition' value={condition.comparison} onChange={(e) => handleConditionChange(index, 'comparison', e.target.value)}>
                        {condition.field === 'level' ? (
                            <>
                                <option value="lessThan">&le;</option>
                                <option value="equals">=</option>
                                <option value="greaterThan">&ge;</option>
                            </>
                        ) : (
                            <>
                                <option value="contains">=</option>
                                <option value="notContains">!=</option>
                            </>
                        )}
                    </select>

                    <input
                    className='search-bar'
                        type="text"
                        value={condition.value}
                        onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
                    />

                    {index === 0 ? (
                        <button onClick={addCondition}>+</button>
                    ) : (
                        <button onClick={() => removeCondition(index)}>&times;</button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default SearchConditionRow;
