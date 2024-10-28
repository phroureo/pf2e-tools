import React, { useState, useEffect } from 'react';
import { EquipmentItem } from '../types/EquipmentItem';
import { ManifestItem } from '../types/ManifestItem';
import { formatPrice } from '../utils/formatPrice';

interface ItemListProps {
    items: ManifestItem[]; // This is the list of minimal data from the manifest
    onAddItem: (item: EquipmentItem) => void;
}

const TraitPill: React.FC<{ trait: string }> = ({ trait }) => {
    let backgroundColor = '#444';
    if (trait === 'uncommon') backgroundColor = '#c45500';
    else if (trait === 'rare') backgroundColor = '#0c1466';
    else if (trait === 'unique') backgroundColor = '#800080';

    return (
        <span className="trait-pill" style={{ backgroundColor }}>
            {trait}
        </span>
    );
};


type SearchCondition = {
    field: string;
    value: string;
    comparison: string;
};

const ItemList: React.FC<ItemListProps> = ({ items, onAddItem }) => {
    const [manifestItems, setManifestItems] = useState<ManifestItem[]>([]);
    const [fullItems, setFullItems] = useState<EquipmentItem[]>([]);
    const [searchConditions, setSearchConditions] = useState<SearchCondition[]>([
        { field: 'name', value: '', comparison: 'contains' }
    ]);
    const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Sorting state
    const [sortCriteria, setSortCriteria] = useState<'name' | 'price'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Fetch full item details when an item is clicked
    const fetchFullItemDetails = async (fileName: string) => {
        try {
            const response = await fetch(`/equipmentjson/packs/equipment/${fileName}`);
            if (!response.ok) throw new Error(`Failed to fetch item details: ${response.statusText}`);
            const data: EquipmentItem = await response.json();
            setSelectedItem(data);
        } catch (error) {
            console.error('Error fetching item details:', error);
        }
    };

    const handleItemClick = (item: ManifestItem, index: number) => {
        setSelectedFileName(item.id); // Set the file name for fetching full details
        fetchFullItemDetails(item.id); // Fetch full details when an item is clicked
        setSelectedIndex(index);
    };

    const filteredItems = items
        .filter((item) => {
            return searchConditions.every((condition) => {
                const term = condition.value.toLowerCase();
                if (condition.value === '') {
                    return true;
                } else if (condition.field === 'name') {
                    if (condition.comparison === 'contains') {
                        return item.name.toLowerCase().includes(term);
                    } else if (condition.comparison === 'notContains') {
                        return !item.name.toLowerCase().includes(term);
                    }
                } else if (condition.field === 'traits') {
                    if (condition.comparison === 'contains') {
                        return item.traits?.some(trait => trait.toLowerCase().includes(term));
                    } else if (condition.comparison === 'notContains') {
                        return !item.traits?.some(trait => trait.toLowerCase().includes(term));
                    }
                } else if (condition.field === 'description') {
                    if (condition.comparison === 'contains') {
                        return item.description?.toLowerCase().includes(term);
                    } else if (condition.comparison === 'notContains') {
                        return !item.description?.toLowerCase().includes(term);
                    }
                } else if (condition.field === 'level') {
                    const lvlVal = parseInt(condition.value, 10);
                
                    // Ensure item.level is a number; treat undefined level as not meeting any condition
                    const itemLevel = item.level;
                
                    if (condition.comparison === 'greaterThan') {
                        return itemLevel! >= lvlVal;
                    } else if (condition.comparison === 'lessThan') {
                        return itemLevel! <= lvlVal;
                    } else if (condition.comparison === 'equals') {
                        return itemLevel! === lvlVal;
                    }
                }
                return false;
            });
        })
        .sort((a, b) => {
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

    const handleAddItem = () => {
        if (selectedItem) {
            onAddItem(selectedItem);
            setIsModalOpen(false); // Close modal after adding item
        }
    };

    const handleSearchConditionChange = (index: number, field: keyof SearchCondition, value: string) => {
        const updatedConditions = [...searchConditions];
        updatedConditions[index][field] = value;
        setSearchConditions(updatedConditions);
    };

    const addSearchCondition = () => {
        setSearchConditions([...searchConditions, { field: 'name', value: '', comparison: 'contains' }]);
    };

    const removeSearchCondition = (index: number) => {
        setSearchConditions(searchConditions.filter((_, i) => i !== index));
    };

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Select Items</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="search-bar-container">
                            {searchConditions.map((condition, index) => (
                                <div key={index} className="search-condition">

                                    {/* Filter Field Dropdown */}
                                    <select
                                        value={condition.field}
                                        onChange={(e) => handleSearchConditionChange(index, 'field', e.target.value)}
                                        className="filter-dropdown"
                                    >
                                        <option value="name">Name</option>
                                        <option value="traits">Traits</option>
                                        <option value="description">Description</option>
                                        <option value="level">Level</option>
                                    </select>

                                    {/* Comparison Dropdown */}
                                    {condition.field === 'level' ? (
                                        <select
                                            value={condition.comparison || 'lessThan'}
                                            onChange={(e) => handleSearchConditionChange(index, 'comparison', e.target.value)}
                                            className="comparison-dropdown"
                                        >
                                            <option value="lessThan">&le;</option>
                                            <option value="equals">=</option>
                                            <option value="greaterThan">&ge;</option>
                                        </select>
                                    ) : (
                                        <select
                                            value={condition.comparison || 'contains'}
                                            onChange={(e) => handleSearchConditionChange(index, 'comparison', e.target.value)}
                                            className="comparison-dropdown"
                                        >
                                            <option value="contains">=</option>
                                            <option value="notContains">!=</option>
                                        </select>
                                    )}

                                    {/* Search Text Input */}
                                    <input
                                        type="text"
                                        placeholder={`Search by ${condition.field}`}
                                        value={condition.value}
                                        onChange={(e) => handleSearchConditionChange(index, 'value', e.target.value)}
                                        className="search-bar"
                                    />

                                    {/* Add/Remove Condition Buttons */}
                                    {index === 0 ? (
                                        <button onClick={addSearchCondition} className="add-search">+</button>
                                    ) : (
                                        <button onClick={() => removeSearchCondition(index)} className="remove-search">
                                            &times;
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>


                        <div className="modal-body">
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
                                    {filteredItems.map((item, index) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleItemClick(item, index)}
                                            className={`item-list-entry ${selectedIndex === index ? 'selected' : ''}`}
                                        >
                                            <span className="item-name">{item.name}</span>
                                            <span className="item-price">{formatPrice(item.price?.value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedItem && (
                                <div className="item-details">
                                    <div className="name-price-container">
                                        <h3 className="item-name">{selectedItem.name}</h3>
                                        <span className="item-price">{formatPrice(selectedItem.system?.price?.value)}</span>
                                    </div>
                                    <div className="traits-container">
                                        {selectedItem.system?.traits?.rarity && selectedItem.system.traits.rarity.toLowerCase() !== 'common' && (
                                            <TraitPill key={selectedItem.system.traits.rarity} trait={selectedItem.system.traits.rarity} />
                                        )}
                                        {selectedItem.system?.traits?.value.map((trait) => (
                                            <TraitPill key={trait} trait={trait} />
                                        ))}
                                    </div>
                                    <div
                                        className="item-description"
                                        dangerouslySetInnerHTML={{ __html: selectedItem.system?.description?.value || '' }}
                                    />

                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button onClick={() => setIsModalOpen(false)} className="close-button">
                                Close
                            </button>
                            {selectedItem && (
                                <button onClick={handleAddItem} className="add-to-list-button">
                                    Add to List
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ItemList;
