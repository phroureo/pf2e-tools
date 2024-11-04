import React, { useState, useRef, useEffect } from 'react';
import { copperToString, formatPrice } from '../utils/formatPrice';
import { ManifestItem } from '../types/ManifestItem';
import Modal from './Modals/Modal';
import ItemDetails from './ItemDetails';

interface SelectedItemsProps {
    items: ManifestItem[];
    onRemoveItem: (index: number) => void;
    onQuantityChange: (index: number, delta: number) => void;
    availableCopper: number;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ items, onRemoveItem, onQuantityChange, availableCopper }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        items.reduce((acc, _, idx) => ({ ...acc, [idx]: 1 }), {})
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<ManifestItem | null>(null);

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

    const openModal = (item: ManifestItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
    };

    return (
        <div style={{ width: '100%', textAlign: 'center' }}>
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {items.map((item, index) => {
                    const quantity = quantities[index] || 1;
                    const itemTotalPrice = {
                        cp: (item.price?.value?.cp ?? 0) * quantity,
                        sp: (item.price?.value?.sp ?? 0) * quantity,
                        gp: (item.price?.value?.gp ?? 0) * quantity,
                        pp: (item.price?.value?.pp ?? 0) * quantity,
                    };
                    const isConsumable = item.traits?.includes("consumable");

                    return (
                        <li
                            key={index}
                            style={{
                                display: 'flex',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                            onClick={() => openModal(item)}
                        >
                            {/* Left side: First and Second Line (stacked vertically) */}
                            <div style={{
                                flex: 1,
                                width: '100%',
                            }}>
                                {/* First Line: Item Name and Price */}
                                <div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <h3
                                            style={{
                                                flex: 1,
                                                whiteSpace: 'nowrap',
                                                marginTop: 0,
                                                marginBottom: 10,
                                                textAlign: 'left', // Ensure text is left-aligned
                                            }}
                                            ref={(el) => (itemRefs.current[index] = el)} // Set ref for each item name
                                        >
                                            {item.name}
                                        </h3>
                                        {/* Right side: Remove Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onRemoveItem(index);
                                            }}
                                            className="button-x"
                                            style={{
                                                marginLeft: 'auto', // Pushes the button to the right
                                            } as React.CSSProperties} // Type assertion for inline styles
                                        />
                                    </div>
                                    <div className="divider-horizontal"></div>

                                    {/* Second Line: Quantity Controls and Item Total Price (only if consumable) */}
                                    <div style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'left',
                                        justifyContent: 'space-between',
                                        gap: '1em', // Adds consistent spacing
                                        whiteSpace: 'nowrap' // Prevents text from wrapping
                                    }}>
                                        {/* Price */}
                                        <div style={{ flexShrink: 0 }}>Price: {formatPrice(item.price?.value)}</div>

                                        {/* Quantity Controls */}
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <button className='minimal-button' onClick={(e) => { e.stopPropagation(); handleQuantityChange(index, -1); }}>-</button>
                                            <span style={{ margin: '0 10px' }}>{quantity}</span>
                                            <button className='minimal-button' onClick={(e) => { e.stopPropagation(); handleQuantityChange(index, 1); }}>+</button>
                                        </div>

                                        {/* Item Total Price */}
                                        <div style={{ flexShrink: 0 }}>
                                            <b>Total</b>: {formatPrice(itemTotalPrice)}
                                        </div>

                                        {/* Level */}
                                        <div className='item-level' style={{ flexShrink: 0 }}>
                                            Level {item.level}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Modal for Item Details */}
            <Modal
                isOpen={isModalOpen}
            >
                {selectedItem && <ItemDetails item={selectedItem} />}
                <button onClick={closeModal} className="close-button">Close</button>
            </Modal>
        </div>
    );
};

export default SelectedItems;
