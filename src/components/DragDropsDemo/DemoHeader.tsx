// DemoHeader.tsx
import React, { useState } from 'react';
import DropZone from './Drop';

interface DraggableItem {
  id: string;
  limit: number;
  zone: string; // Track which zone each item is in
}

const initialDraggables: DraggableItem[] = [
  { id: 'item1', limit: 3, zone: 'draggables' },
  { id: 'item2', limit: 1, zone: 'draggables' },
  { id: 'item3', limit: 2, zone: 'draggables' },
];

const DragDropContainer = () => {
  const [items, setItems] = useState<DraggableItem[]>(initialDraggables);
  const [draggingItem, setDraggingItem] = useState<DraggableItem | null>(null);

  const handleAddItem = () => {
    const newItem: DraggableItem = { id: `item${items.length + 1}`, limit: 1, zone: 'draggables' };
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const updateItemZone = (itemId: string, newZone: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === itemId ? { ...item, zone: newZone } : item))
    );
  };

  const reorderItemsInZone = (zoneId: string, sourceIndex: number, targetIndex: number) => {
    setItems((prevItems) => {
      const zoneItems = prevItems.filter((item) => item.zone === zoneId);
      const [movedItem] = zoneItems.splice(sourceIndex, 1);
      zoneItems.splice(targetIndex, 0, movedItem);

      return prevItems.map((item) => (item.zone === zoneId ? zoneItems.shift()! : item));
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3>Draggable Items</h3>
        <button onClick={handleAddItem} style={{ marginBottom: '10px' }}>
          Add New Item
        </button>
        <DropZone
          zoneId="draggables"
          maxSlots={Infinity}
          limit={0}
          items={items.filter((item) => item.zone === 'draggables')}
          updateItemZone={updateItemZone}
          reorderItemsInZone={reorderItemsInZone}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
        />
      </div>

      <div>
        <h3>Drop Zone 1 (Max Slots: 2, Required Limit: 2)</h3>
        <DropZone
          zoneId="zone1"
          maxSlots={2}
          limit={2}
          items={items.filter((item) => item.zone === 'zone1')}
          updateItemZone={updateItemZone}
          reorderItemsInZone={reorderItemsInZone}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
        />
      </div>

      <div>
        <h3>Drop Zone 2 (Max Slots: 3, Required Limit: 1)</h3>
        <DropZone
          zoneId="zone2"
          maxSlots={3}
          limit={1}
          items={items.filter((item) => item.zone === 'zone2')}
          updateItemZone={updateItemZone}
          reorderItemsInZone={reorderItemsInZone}
          draggingItem={draggingItem}
          setDraggingItem={setDraggingItem}
        />
      </div>
    </div>
  );
};

export default DragDropContainer;
