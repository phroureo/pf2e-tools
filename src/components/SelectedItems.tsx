import React, { useState, useRef, useEffect } from 'react';
import DropZone from './DragAndDrop/DropZone';
import { EquipmentItem } from '../types/EquipmentItem';
import { ManifestItem } from '../types/ManifestItem';

interface SelectedItemsProps {
    items: EquipmentItem[];
    onQuantityChange: (index: number, delta: number) => void;
    handleRemoveItem(index: number): void;
    updateItemZone: (item: EquipmentItem, newZone: string) => void; // Centralized update function
    reorderItemsInZone: (zoneId: string, sourceIndex: number, targetIndex: number) => void; // Reordering function
    draggingItem: EquipmentItem | null;
    setDraggingItem: React.Dispatch<React.SetStateAction<EquipmentItem | null>>;
    allEquipment: ManifestItem[];
    handleAddItem: (item: ManifestItem, zone: string) => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ items, onQuantityChange, handleRemoveItem, updateItemZone, reorderItemsInZone, draggingItem, setDraggingItem, allEquipment, handleAddItem }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        items.reduce((acc, _, idx) => ({ ...acc, [idx]: 1 }), {})
    );

    const itemRefs = useRef<(HTMLHeadingElement | null)[]>([]); // Array of refs for each item name

    const fitTextToContainer = (element: HTMLHeadingElement) => {
        const containerWidth = element.parentElement?.offsetWidth || 0;
        const textWidth = element.scrollWidth;

        const scale = textWidth > containerWidth ? containerWidth / textWidth : 1;
        element.style.transform = `scale(${scale})`;
        element.style.transformOrigin = 'left center';
    };

    useEffect(() => {
        const observers: ResizeObserver[] = [];

        // Attach a ResizeObserver to each item name
        itemRefs.current.forEach((element) => {
            if (element) {
                const observer = new ResizeObserver(() => fitTextToContainer(element));
                observer.observe(element.parentElement!); // Observe the parent container
                observers.push(observer);

                // Apply scaling initially
                fitTextToContainer(element);
            }
        });

        // Clean up observers on unmount
        return () => observers.forEach((observer) => observer.disconnect());
    }, [items]);

    const handleQuantityChange = (index: number, delta: number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [index]: Math.max(1, (prevQuantities[index] || 1) + delta),
        }));
        onQuantityChange(index, delta);
    };


    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <DropZone
                zoneId="selectedItems"
                maxSlots={Infinity}
                slotLevel={Infinity}
                style={{ background: "transparent", border: "none" }}
                items={items}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                quantityChangeEnabled={true}
                updateItemZone={updateItemZone}
                reorderItemsInZone={reorderItemsInZone}
                draggingItem={draggingItem}
                setDraggingItem={setDraggingItem}
                allEquipment={allEquipment}
                handleAddItem={handleAddItem}
            />
        </div>
    );
};

export default SelectedItems;
