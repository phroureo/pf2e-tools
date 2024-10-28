import React from 'react';
import { EquipmentItem } from '../types/EquipmentItem';
import TraitPill from './TraitPill';
import { formatPrice } from '../utils/formatPrice';
import { ManifestItem } from '../types/ManifestItem';

interface ItemDetailsProps {
    item: ManifestItem;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
    return (
    <div className="item-details">
        <div className="name-price-container">
            <h3 className="item-name">{item.name}</h3>
            <span className="item-price">{formatPrice(item.price?.value)}</span>
        </div>
        <div className="traits-container">
            {item.rarity && item.rarity.toLowerCase() !== 'common' && (
                <TraitPill trait={item.rarity} />
            )}
            {item.traits && item.traits.map((trait) => (
                <TraitPill key={trait} trait={trait} />
            ))}
        </div>
        <div className="item-description" dangerouslySetInnerHTML={{ __html: item.description || '' }} />
    </div>
    );
};

export default ItemDetails;
