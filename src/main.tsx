// src/main.tsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CharacterLevel from './components/CharacterLevel';
import ItemList from './components/ItemList';
import SelectedItems from './components/SelectedItems';
import { fetchEquipmentData } from './utils/fetchData';
import { EquipmentItem } from './types/EquipmentItem';
import { simplifyPrice, formatPrice } from './utils/formatPrice';
import './styles/styles.css';
import './styles/buttons.css';
import './styles/modal.css';
import './styles/form.css';
import { ManifestItem } from './types/ManifestItem';

interface TotalPrice {
    cp: number;
    sp: number;
    gp: number;
    pp: number;
}

const Main: React.FC = () => {
    const [characterLevel, setCharacterLevel] = useState(1);
    const [equipmentData, setEquipmentData] = useState<ManifestItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<EquipmentItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<TotalPrice>({ cp: 0, sp: 0, gp: 0, pp: 0 });

    useEffect(() => {
        fetchEquipmentData()
            .then((data) => setEquipmentData(data))
            .catch((error) => console.error('Error fetching equipment data:', error));
    }, []);

    const handleAddItem = (item: EquipmentItem) => {
        setSelectedItems((prevItems) => [...prevItems, item]);

        // Update the raw total price with safe access
        setTotalPrice((prevTotal) => ({
            cp: prevTotal.cp + (item.system?.price?.value?.cp ?? 0),
            sp: prevTotal.sp + (item.system?.price?.value?.sp ?? 0),
            gp: prevTotal.gp + (item.system?.price?.value?.gp ?? 0),
            pp: prevTotal.pp + (item.system?.price?.value?.pp ?? 0),
        }));
    };

    const handleRemoveItem = (index: number) => {
        const removedItem = selectedItems[index];
        setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));

        // Subtract from the raw total price with safe access
        setTotalPrice((prevTotal) => ({
            cp: prevTotal.cp - (removedItem.system?.price?.value?.cp ?? 0),
            sp: prevTotal.sp - (removedItem.system?.price?.value?.sp ?? 0),
            gp: prevTotal.gp - (removedItem.system?.price?.value?.gp ?? 0),
            pp: prevTotal.pp - (removedItem.system?.price?.value?.pp ?? 0),
        }));
    };


    // Simplify the total price for display
    const simplifiedTotalPrice = simplifyPrice(totalPrice);

    return (
        <div className="container">
            <h1>PF2e Equipment Picker</h1>
            <CharacterLevel level={characterLevel} onLevelChange={setCharacterLevel} />
            <ItemList items={equipmentData} onAddItem={handleAddItem} />
            <SelectedItems
                items={selectedItems}
                totalPrice={formatPrice(simplifiedTotalPrice)}
                onRemoveItem={handleRemoveItem}
            />

        </div>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<React.StrictMode><Main /></React.StrictMode>);
} else {
    console.error("Root element not found");
}

export default Main;
