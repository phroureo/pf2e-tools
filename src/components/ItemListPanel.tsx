import React, { useState, useEffect, useRef } from 'react';
import { ManifestItem } from '../types/ManifestItem';
import { calculateTotalValue, formatPrice } from '../utils/formatPrice';
import { SearchCondition } from '../types/SearchCondition';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';

interface ItemListPanelProps {
    items: ManifestItem[];
    searchConditions: SearchCondition[];
    onItemSelect: (item: ManifestItem) => void;
    showNoPriceItems: Boolean;
    showAffordableItemsOnly: Boolean;
    availableCopper: number;
}

const ItemListPanel: React.FC<ItemListPanelProps> = ({ items, searchConditions, onItemSelect, showNoPriceItems, showAffordableItemsOnly, availableCopper }) => {
    const [sortCriteria, setSortCriteria] = useState<'name' | 'price'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [listHeight, setListHeight] = useState(400); // Default height as fallback
    const containerRef = useRef<HTMLDivElement | null>(null);

    // Update listHeight based on container size
    useEffect(() => {
        if (containerRef.current) {
            const updateHeight = () => setListHeight(containerRef.current?.clientHeight || 400);
            updateHeight(); // Initial measurement

            // Listen for resize changes
            const resizeObserver = new ResizeObserver(updateHeight);
            resizeObserver.observe(containerRef.current);

            return () => resizeObserver.disconnect();
        }
    }, []);

    const filteredItems = items.filter((item) => {
        // Check if showNoPriceItems is false and the item has no price or a price of 0 in all fields
        const hasPrice = item.price?.value;
        const isNoPriceItem = !hasPrice ||
            (hasPrice.pp === 0 && hasPrice.gp === 0 && hasPrice.sp === 0 && hasPrice.cp === 0);

        if (!showNoPriceItems && isNoPriceItem) {
            return false; // Filter out items without a price if showNoPriceItems is false
        }

        if (hasPrice && showAffordableItemsOnly && calculateTotalValue(item.price?.value || { cp: 0, sp: 0, gp: 0, pp: 0 }) > availableCopper) {
            return false;
        }

        return searchConditions.every((condition) => {
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
    });

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

    const Row = ({ index, style }: ListChildComponentProps) => {
        const item = sortedItems[index];
        return (
            <div
                style={style}
                key={index}
                onClick={() => onItemSelect(item)}
                className="item-list-entry"
            >
                <span className="item-name">{item.name}</span>
                <span className="item-price">{formatPrice(item.price?.value)}</span>
            </div>
        );
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
            <div ref={containerRef} className="item-list-container" style={{ height: '100%' }}>
                <List
                    height={listHeight} // Dynamically updated height based on containerRef
                    itemCount={sortedItems.length}
                    itemSize={50} // Adjust item size as needed
                    width="100%"
                    style={{ margin: 10 }}
                >
                    {Row}
                </List>
            </div>
        </div>
    );
};

export default ItemListPanel;
