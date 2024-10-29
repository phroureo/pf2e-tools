import React, { useState } from 'react';
import { formatPrice } from '../utils/formatPrice';
import { ManifestItem } from '../types/ManifestItem';

interface SelectedItemsProps {
    items: ManifestItem[];
    totalPrice: string;
    onRemoveItem: (index: number) => void;
    onQuantityChange: (index: number, delta: number) => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ items, totalPrice, onRemoveItem, onQuantityChange }) => {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>(
        items.reduce((acc, _, idx) => ({ ...acc, [idx]: 1 }), {})
    );

    const handleQuantityChange = (index: number, delta: number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [index]: Math.max(1, (prevQuantities[index] || 1) + delta),
        }));
        onQuantityChange(index, delta);
    };

    return (
        <div>
            <h2>Selected Items</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
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
                        <li key={index} style={{ marginBottom: '1em' }}>
                            {/* First Line: Item Name, Price, and Remove Button */}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ flex: '1' }}>
                                    <strong>{item.name}</strong>
                                    <div>Price: {formatPrice(item.price?.value)}</div>
                                </div>
                                
                                {/* Remove Button */}
                                <button onClick={() => onRemoveItem(index)} style={{ marginLeft: '0.5em', padding: '0.5em' }}>
                                    ✖
                                </button>
                            </div>

                            {/* Second Line: Quantity Controls and Item Total Price (only if consumable) */}
                            {isConsumable && (
                                <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5em' }}>
                                    {/* Quantity Controls */}
                                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '1em' }}>
                                        <button className='minimal-button' onClick={() => handleQuantityChange(index, -1)}>-</button>
                                        <span style={{ margin: '0 10px' }}>{quantity}</span>
                                        <button className='minimal-button' onClick={() => handleQuantityChange(index, 1)}>+</button>
                                    </div>

                                    {/* Item Total Price */}
                                    <div>
                                        <b>Total</b>: {formatPrice(itemTotalPrice)}
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>

            {/* Overall Total Price */}
            <h3>Total Price: {totalPrice ? totalPrice: "0 gp"}</h3>
        </div>
    );
};

export default SelectedItems;
