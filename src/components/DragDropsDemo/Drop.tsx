// Drop.tsx
import React, { useState, useEffect } from 'react';
import { ManifestItem } from '../../types/ManifestItem';

interface DraggableItem {
  id: string;
  limit: number;
  zone: string; // Ensure 'zone' is specified here as expected by DropZoneProps
}


interface DropZoneProps {
  zoneId: string;
  maxSlots: number;
  limit: number;
  items: DraggableItem[];
  updateItemZone: (itemId: string, newZone: string) => void;
  reorderItemsInZone: (zoneId: string, sourceIndex: number, targetIndex: number) => void;
  draggingItem: DraggableItem | null;
  setDraggingItem: React.Dispatch<React.SetStateAction<DraggableItem | null>>;
}

const DropZone: React.FC<DropZoneProps> = ({
  zoneId,
  maxSlots,
  limit,
  items,
  updateItemZone,
  reorderItemsInZone,
  draggingItem,
  setDraggingItem
}) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();

    if (draggingItem && items.length < maxSlots && draggingItem.limit >= limit) {
      updateItemZone(draggingItem.id, zoneId);
    } 
    setDraggingItem(null); // Reset the dragging item after drop
  };

  const handleDragStart = (item: DraggableItem, index: number) => {
    setDraggingItem(item);
    setDraggingIndex(index);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
    setDraggingIndex(null);
  };

  const handleDragOver = (event: React.DragEvent, targetIndex: number) => {
    event.preventDefault();
    if (draggingIndex !== null && draggingIndex !== targetIndex) {
      reorderItemsInZone(zoneId, draggingIndex, targetIndex);
      setDraggingIndex(targetIndex);
    }
  };

  React.useEffect(() => {
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

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      style={{
        border: '2px dashed #aaa',
        padding: '20px',
        minHeight: '50px',
        textAlign: 'center',
        backgroundColor: '#f8f8f8',
      }}
    >
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
            backgroundColor: '#fff',
            cursor: 'grab',
          }}
        >
          {item.id} (Limit: {item.limit})
        </div>
      ))}
    </div>
  );
};

export default DropZone;
