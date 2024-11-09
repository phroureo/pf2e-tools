import React, { CSSProperties, useState, useEffect } from 'react';
import ListItem from '../ListItem';
import Modal from '../Modals/Modal';
import ItemDetails from '../ItemDetails';
import { EquipmentItem } from '../../types/EquipmentItem';
import { SearchCondition } from '../../types/SearchCondition';
import SearchConditionRow from '../SearchConditionRow';
import ItemListPanel from '../ItemListPanel';
import { ManifestItem } from '../../types/ManifestItem';

interface DropZoneProps {
  zoneId: string;
  maxSlots: number;
  slotLevel: number;
  items: EquipmentItem[]; // Items passed from DragDropContainer
  updateItemZone: (item: EquipmentItem, newZone: string) => void; // Centralized update function
  reorderItemsInZone: (zoneId: string, sourceIndex: number, targetIndex: number) => void; // Reordering function
  style?: CSSProperties;
  handleQuantityChange(index: number, delta: number): void;
  handleRemoveItem(index: number): void;
  quantityChangeEnabled: boolean;
  draggingItem: EquipmentItem | null;
  setDraggingItem: React.Dispatch<React.SetStateAction<EquipmentItem | null>>;
  highlightBorder?: boolean;
  updateLevelItems?: (level: number, inc: number) => void; // New prop to update level items
  enableFilteredModal?: boolean;
  allEquipment: ManifestItem[];
  handleAddItem(item: ManifestItem, zone: string): void;
}

const DropZone: React.FC<DropZoneProps> = ({
  zoneId,
  maxSlots,
  slotLevel,
  items,
  updateItemZone,
  reorderItemsInZone,
  style,
  handleQuantityChange,
  handleRemoveItem,
  quantityChangeEnabled,
  draggingItem,
  setDraggingItem,
  highlightBorder = true,
  updateLevelItems = () => { },
  enableFilteredModal = false,
  allEquipment,
  handleAddItem
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ManifestItem | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [searchConditions, setSearchConditions] = useState<SearchCondition[]>([]);

  useEffect(() => {
    if (enableFilteredModal) {
      // Set the fixed level filter condition
      setSearchConditions([{ field: 'level', comparison: 'equals', value: slotLevel.toString(), allowEdit: false }]);
    }
  }, [enableFilteredModal, slotLevel]);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();

    // Check dragging item and constraints before updating zone
    if (draggingItem && items.length < maxSlots && draggingItem.level <= slotLevel) {
      updateItemZone(draggingItem, zoneId); // Update the item's zone
    }

    setDraggingItem(null); // Reset after drop
    setIsHovered(false);
  };

  const handleDragStart = (item: EquipmentItem, index: number) => {
    setDraggingItem(item);  // Set the centralized dragging item
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);  // Clear the centralized dragging item
    setDraggingIndex(null);
    setIsHovered(false);
  };

  const handleDragOver = (event: React.DragEvent, targetIndex: number) => {
    event.preventDefault();
    if (draggingIndex !== null && draggingIndex !== targetIndex) {
      reorderItemsInZone(zoneId, draggingIndex, targetIndex);
      setDraggingIndex(targetIndex);
    };
    if (highlightBorder) {
      setIsHovered(true);
    };
  };

  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault();
    if (highlightBorder) {
      setIsHovered(true); // Set hover state when an item enters
    }
  };



  const handleDragExit = (event: React.DragEvent) => {
    event.preventDefault();
    if (highlightBorder) {
      setIsHovered(false); // Set hover state when an item enters
    }
  };


  const handleLevelItemDecrement = () => {
    updateLevelItems(slotLevel, -1);
  };

  const handleClick = () => {
    if (enableFilteredModal) {
      openFilteredModal();
    }
  };

  // Function to open modal with filtered conditions
  const openFilteredModal = () => {
    setIsSelectModalOpen(true);
    if (enableFilteredModal) {
      // Ensure filter is applied when modal opens
      setSearchConditions([{ field: 'level', comparison: 'equals', value: slotLevel.toString(), allowEdit: false }]);
    }
  };

  const borderStyle = () => {
    if (isHovered && draggingItem && items.length < maxSlots && draggingItem.level <= slotLevel && highlightBorder) {
      return '2px solid green';
    } else if (isHovered && draggingItem && highlightBorder) {
      return '2px solid red';
    }
    return '2px dashed #aaa';
  };

  useEffect(() => {
    const removeItemListener = (event: CustomEvent<{ id: string; sourceZoneId: string }>) => {
      if (event.detail.sourceZoneId === zoneId) {
        // Handle removing items if needed
      }
    };

    document.addEventListener('removeItem', removeItemListener as EventListener);
    return () => {
      document.removeEventListener('removeItem', removeItemListener as EventListener);
    };
  }, [zoneId]);

  const openModal = (item: EquipmentItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const addItem = (selectedItem: ManifestItem) => {
    handleAddItem(selectedItem, zoneId);
    closeModal();
  }

  const closeModal = () => {
    setIsDetailModalOpen(false);
    setIsSelectModalOpen(false);
    setSelectedItem(null);
  };



  return (
    <>
      <div
        onClick={items.length < maxSlots ? handleClick : undefined}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={handleDragEnter}
        onDragExit={handleDragExit}
        style={{
          minHeight: '50px',
          textAlign: 'center',
          backgroundColor: '#f8f8f8',
          position: 'relative',
          border: isHovered && highlightBorder ? borderStyle() : '2px dashed #aaa', // Dynamically apply border style
          cursor: items.length < maxSlots && maxSlots < Infinity ? "pointer" : "auto" ,
          ...style,
        }}
      >
        {/* Conditional Button for Removing Slots */}
        {maxSlots !== Infinity && (
          <button
            onClick={handleLevelItemDecrement}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              fontSize: '10px',
              padding: '2px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
            title={`Remove slot${maxSlots === 1 ? '' : 's'}`}
          >
            {maxSlots === 1 ? 'X' : '-'}
          </button>
        )}

        <div style={{ textAlign: "left", padding: "0" }}>
          {maxSlots !== Infinity && <div style={{ padding: "10px" }}>Items: {items.length}/{maxSlots} </div>}
        </div>
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => handleDragStart(item, index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
            style={{
              border: '1px solid black',
              padding: '10px',
              margin: '5px 0',
              cursor: 'grab',
            }}
          >
            <ListItem
              item={item}
              index={index}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              quantityChangeEnabled={quantityChangeEnabled}
              openModal={openModal}
            />
          </div>
        ))}
      </div>
      <Modal isOpen={isDetailModalOpen}>
        {selectedItem && <ItemDetails item={selectedItem} />}
        <button onClick={closeModal} className="close-button">Close</button>
      </Modal>
      {/* Render the modal */}
      <Modal isOpen={isSelectModalOpen}>
        <SearchConditionRow
          searchConditions={searchConditions}
          onConditionsChange={setSearchConditions}
        />
        <div className='modal-body'>
          <ItemListPanel
            items={allEquipment}
            searchConditions={searchConditions}
            onItemSelect={(item) => setSelectedItem(item)}
            showNoPriceItems={false}
            availableCopper={Infinity}
            showAffordableItemsOnly={true}
            showMythicItems={false}
          />


          {selectedItem && <ItemDetails item={selectedItem} />}
        </div>
        <div className="modal-footer">
          <button onClick={closeModal} className="close-button">Close</button>
          {selectedItem && (
            <button onClick={() => addItem(selectedItem)} className="add-to-list-button">
              Add to List
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DropZone;
