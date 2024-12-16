import React, { useRef, useEffect } from 'react';
import { copperToString, formatPrice } from '../utils/formatPrice';
import { EquipmentItem } from '../types/EquipmentItem';

interface SelectedItemProps {
    item: EquipmentItem;
    index: number;
    quantity?: number;
    onQuantityChange: (index: number, delta: number) => void;
    onRemoveItem: (id: string) => void;
    openModal: (item: EquipmentItem) => void;
    quantityChangeEnabled: boolean;
}

const SelectedItem: React.FC<SelectedItemProps> = ({ item, index, quantity, onQuantityChange, onRemoveItem, openModal, quantityChangeEnabled }) => {
    const itemRef = useRef<HTMLHeadingElement | null>(null);

    const fitTextToContainer = (element: HTMLHeadingElement) => {
        const containerWidth = element.parentElement?.offsetWidth || 0;
        const textWidth = element.scrollWidth;

        const scale = textWidth > containerWidth ? containerWidth / textWidth : 1;
        element.style.transform = `scale(${scale})`;
        element.style.transformOrigin = 'left center';
    };

    useEffect(() => {
        if (itemRef.current) {
            const observer = new ResizeObserver(() => fitTextToContainer(itemRef.current!));
            observer.observe(itemRef.current.parentElement!);

            fitTextToContainer(itemRef.current); // Initial fit

            return () => observer.disconnect(); // Cleanup on unmount
        }
    }, []);

    const itemTotalPrice = {
        cp: (item.price?.value?.cp ?? 0) * (quantity ?? 1),
        sp: (item.price?.value?.sp ?? 0) * (quantity ?? 1),
        gp: (item.price?.value?.gp ?? 0) * (quantity ?? 1),
        pp: (item.price?.value?.pp ?? 0) * (quantity ?? 1),
    };

    return (
        <div style={{ flex: 1, width: '100%' }}>
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
                            textAlign: 'left',
                            cursor: 'pointer',
                        }}
                        onClick={() => openModal(item)}
                        ref={itemRef}
                    >
                        {item.name}
                    </h3>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemoveItem(item.id);
                        }}
                        className="button-x"
                        style={{ marginLeft: 'auto' }}
                    />
                </div>
                <div className="divider-horizontal"></div>

                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'left',
                        justifyContent: 'space-between',
                        gap: '1em',
                        whiteSpace: 'nowrap',
                    }}
                >
                    <div style={{ flexShrink: 0 }}>Price: {formatPrice(item.price?.value)}</div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {quantityChangeEnabled && <button className='minimal-button' onClick={(e) => { e.stopPropagation(); onQuantityChange(index, -1); }}>-</button>}
                        <span style={{ margin: '0 10px' }}>{quantity}</span>
                        {quantityChangeEnabled && <button className='minimal-button' onClick={(e) => { e.stopPropagation(); onQuantityChange(index, 1); }}>+</button>}
                    </div>

                    <div style={{ flexShrink: 0 }}>
                        <b>Total</b>: {formatPrice(itemTotalPrice)}
                    </div>

                    <div className='item-level' style={{ flexShrink: 0 }}>
                        Level {item.level}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedItem;
