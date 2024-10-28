import React, { useState } from 'react';
import { ManifestItem } from '../types/ManifestItem';
import { formatPrice } from '../utils/formatPrice';
import { SearchCondition } from '../types/SearchCondition';

interface ItemListPanelProps {
    items: ManifestItem[];
    searchConditions: SearchCondition[];
    onItemSelect: (item: ManifestItem) => void;
}

const ItemListPanel: React.FC<ItemListPanelProps> = ({ items, searchConditions, onItemSelect }) => {
    const [sortCriteria, setSortCriteria] = useState<'name' | 'price'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Apply search filters based on searchConditions
    const filteredItems = items.filter((item) =>
        searchConditions.every((condition) => {
            const term = condition.value.toLowerCase();
            if (condition.value === '') return true;

            if (condition.field === 'name') {
                return condition.comparison === 'contains'
                    ? item.name.toLowerCase().includes(term)
                    : !item.name.toLowerCase().includes(term);
            } else if (condition.field === 'traits') {
                return condition.comparison === 'contains'
                    ? item.traits?.some((trait) => trait.toLowerCase().includes(term))
                    : !item.traits?.some((trait) => trait.toLowerCase().includes(term));
            } else if (condition.field === 'description') {
                return condition.comparison === 'contains'
                    ? item.description?.toLowerCase().includes(term)
                    : !item.description?.toLowerCase().includes(term);
            } else if (condition.field === 'level') {
                const lvlVal = parseInt(condition.value, 10);
                const itemLevel = item.level || 0;
                return condition.comparison === 'greaterThan'
                    ? itemLevel >= lvlVal
                    : condition.comparison === 'lessThan'
                    ? itemLevel <= lvlVal
                    : itemLevel === lvlVal;
            }
            return false;
        })
    );

    const sortedItems = filteredItems.sort((a, b) => {
        const isAscending = sortDirection === 'asc';
        if (sortCriteria === 'name') {
            return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
            const priceA = ((a.price?.value?.pp ?? 0) * 1000) + ((a.price?.value?.gp ?? 0) * 100) + ((a.price?.value?.sp ?? 0) * 10) + (a.price?.value?.cp ?? 0);
            const priceB = ((b.price?.value?.pp ?? 0) * 1000) + ((b.price?.value?.gp ?? 0) * 100) + ((b.price?.value?.sp ?? 0) * 10) + (b.price?.value?.cp ?? 0);
            return isAscending ? priceA - priceB : priceB - priceA;
        }
    });

    const handleSort = (criteria: 'name' | 'price') => {
        if (sortCriteria === criteria) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortCriteria(criteria);
            setSortDirection('asc');
        }
    };

    return (
        <div className="left-panel">
            <div className="sorting-headers">
                <span onClick={() => handleSort('name')} className="header name-header">
                    Name {sortCriteria === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}
                </span>
                <span onClick={() => handleSort('price')} className="header price-header">
                    Price {sortCriteria === 'price' && (sortDirection === 'asc' ? '▲' : '▼')}
                </span>
            </div>
            <div className="item-list">
                {sortedItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => onItemSelect(item)} // Ensure this calls onItemSelect
                        className="item-list-entry"
                    >
                        <span className="item-name">{item.name}</span>
                        <span className="item-price">{formatPrice(item.price?.value)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemListPanel;
