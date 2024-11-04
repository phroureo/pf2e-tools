import React, { useState } from 'react';
import { EquipmentItem } from '../types/EquipmentItem';
import { ManifestItem } from '../types/ManifestItem';
import Modal from './Modals/Modal';
import SearchConditionRow from './SearchConditionRow';
import ItemListPanel from './ItemListPanel';
import ItemDetails from './ItemDetails';
import { SearchCondition } from '../types/SearchCondition';

interface ItemListProps {
    items: ManifestItem[];
    onAddItem: (item: ManifestItem) => void;
    showNoPriceItems: Boolean;
    showAffordableItemsOnly: Boolean;
    showMythicItems: Boolean;
    availableCopper: number;
}

const ItemList: React.FC<ItemListProps> = ({ 
    items, 
    onAddItem, 
    showNoPriceItems, 
    showAffordableItemsOnly, 
    availableCopper,
    showMythicItems,    
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchConditions, setSearchConditions] = useState<SearchCondition[]>([
        { field: 'name', value: '', comparison: 'contains' }
    ]);
    const [selectedItem, setSelectedItem] = useState<ManifestItem | null>(null);

    const handleAddItem = () => {
        if (selectedItem) {
            onAddItem(selectedItem);
            setIsModalOpen(false); // Close modal after adding the item
            setSelectedItem(null);
            setSearchConditions([{ field: 'name', value: '', comparison: 'contains' }]);
        };
    }

    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setSearchConditions([{ field: 'name', value: '', comparison: 'contains' }]);
    }

    return (
        <div>
            <button onClick={() => setIsModalOpen(true)}>Select Items</button>
            <Modal
                isOpen={isModalOpen}
            >
                <SearchConditionRow
                    searchConditions={searchConditions}
                    onConditionsChange={(conditions) => setSearchConditions(conditions)}
                />
                <div className="modal-body">
                    <ItemListPanel
                        items={items}
                        searchConditions={searchConditions}
                        onItemSelect={(item) => setSelectedItem(item)}
                        showNoPriceItems={showNoPriceItems}
                        availableCopper={availableCopper}
                        showAffordableItemsOnly={showAffordableItemsOnly}
                        showMythicItems={showMythicItems}
                    />

                    {selectedItem && <ItemDetails item={selectedItem} />}
                </div>

                <div className="modal-footer">
                    <button onClick={handleClose} className="close-button">Close</button>
                    {selectedItem && (
                        <button onClick={handleAddItem} className="add-to-list-button">
                            Add to List
                        </button>
                    )}
                </div>

            </Modal>
        </div>
    );
};

export default ItemList;
