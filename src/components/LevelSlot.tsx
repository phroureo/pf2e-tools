import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { ManifestItem } from '../types/ManifestItem';

interface LevelSlotProps {
    level: number;
    slotCount: number;
    items: ManifestItem[];
    onDropItem: (item: ManifestItem) => void;
}

const LevelSlot: React.FC<LevelSlotProps> = ({ level, slotCount, items, onDropItem }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `slot-${level}`,
    });

    return (
        <div ref={setNodeRef} style={{
            border: isOver ? '2px solid blue' : '2px solid gray',
            padding: '1em',
            margin: '1em 0',
        }}>
            <h4>Level {level} Slot (x{slotCount})</h4>
            <div>
                {items.map((item, index) => (
                    <div key={index} style={{ padding: '0.5em', border: '1px solid gray', margin: '0.5em 0' }}>
                        {item.name} (Level {item.level})
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LevelSlot;
