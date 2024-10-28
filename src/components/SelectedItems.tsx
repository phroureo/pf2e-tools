// src/components/SelectedItems.tsx

import React from 'react';
import { EquipmentItem } from '../types/EquipmentItem';
import { formatPrice } from '../utils/formatPrice';
import { ManifestItem } from '../types/ManifestItem';

interface SelectedItemsProps {
    items: ManifestItem[];
    totalPrice: string; // Ensure totalPrice is expected as a string here
    onRemoveItem: (index: number) => void;
}

const SelectedItems: React.FC<SelectedItemsProps> = ({ items, totalPrice, onRemoveItem }) => {
    return (
        <div>
            <h2>Selected Items</h2>
            <span className="action-glyph">1 </span> 
            <span className="action-glyph">2 </span> 
            <span className="action-glyph">3 </span> 
            <span className="action-glyph">R </span> 
            <span className="action-glyph">F </span>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>
                        <div>
                            {item.name} - {formatPrice(item.price?.value)}
                        </div>

                        <button onClick={() => onRemoveItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>
            <h3>Total Price: {totalPrice}</h3>
        </div>
    );
};

export default SelectedItems;
