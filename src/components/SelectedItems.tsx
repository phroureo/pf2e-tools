import React, { useState, useRef, useEffect } from 'react';
import { copperToString, formatPrice } from '../utils/formatPrice';
import { ManifestItem } from '../types/ManifestItem';
import Modal from './Modal';
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
        <div>
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
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                            onClick={() => openModal(item)}
                        >
                            {/* Left side: First and Second Line (stacked vertically) */}
                            <div style={{ flex: 1 }}>
                                {/* First Line: Item Name and Price */}
                                <div>
                                    <h3
                                        style={{ 
                                            flex: 1, 
                                            display: 'inline-block', 
                                            whiteSpace: 'nowrap',
                                            marginTop: 0
                                        }}
                                        ref={(el) => (itemRefs.current[index] = el)} // Set ref for each item name
                                    >
                                        {item.name}
                                    </h3>

                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', alignContent: "center", justifyContent: 'space-between' }}>
                                        <div>Price: {formatPrice(item.price?.value)}</div>

                                        <div className='item-level' style={{ marginLeft: "2em" }}>
                                            Level {item.level}
                                        </div>
                                    </div>
                                </div>

                                {/* Second Line: Quantity Controls and Item Total Price (only if consumable) */}
                                {isConsumable && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.5em' }}>
                                        {/* Quantity Controls */}
                                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '1em' }}>
                                            <button className='minimal-button' onClick={(e) => { e.stopPropagation(); handleQuantityChange(index, -1); }}>-</button>
                                            <span style={{ margin: '0 10px' }}>{quantity}</span>
                                            <button className='minimal-button' onClick={(e) => { e.stopPropagation(); handleQuantityChange(index, 1); }}>+</button>
                                        </div>

                                        {/* Item Total Price */}
                                        <div>
                                            <b>Total</b>: {formatPrice(itemTotalPrice)}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right side: Remove Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); onRemoveItem(index); }}
                                className='button-x'
                            />
                        </li>
                    );
                })}
            </ul>

            {/* Modal for Item Details */}
            <Modal 
                isOpen={isModalOpen} 
                onClose={closeModal} 
                selectedItem={selectedItem} 
                handleAddItem={() => {}} 
                showAddToList={false}
            >
                {selectedItem && <ItemDetails item={selectedItem} />}
            </Modal>
        </div>
    );
};

export default SelectedItems;
