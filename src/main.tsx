import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CharacterLevel from './components/CharacterLevel';
import ItemList from './components/ItemList';
import SelectedItems from './components/SelectedItems';
import { fetchEquipmentData } from './utils/fetchData';
import { EquipmentItem } from './types/EquipmentItem';
import { TotalPrice } from './types/TotalPrice';
import { LevelData } from './types/LevelData';
import { simplifyPrice, formatPrice } from './utils/formatPrice';
import './styles/styles.css';
import './styles/toggle.css';
import './styles/buttons.css';
import './styles/modal.css';
import './styles/form.css';
import './styles/input.css';
import { ManifestItem } from './types/ManifestItem';
import Toggle from './components/Toggle';

import './firebaseConfig';

const Main: React.FC = () => {
    const [characterLevel, setCharacterLevel] = useState<number>(1);
    const [equipmentData, setEquipmentData] = useState<ManifestItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<ManifestItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [totalPrice, setTotalPrice] = useState<TotalPrice>({ cp: 0, sp: 0, gp: 0, pp: 0 });
    const [showNoPriceItems, setShowNoPriceItems] = useState<boolean>(false);
    const [showAffordableItems, setShowAffordableItems] = useState<boolean>(true);
    const [levelData, setLevelData] = useState<LevelData[]>([]);
    const [lumpSum, setLumpSum] = useState<number>(15);

    const handleToggleChange = (toggleName: string, value: boolean) => {
        if (toggleName === 'showNoPriceItems') {
            setShowNoPriceItems(value);
        } else if (toggleName === 'showOnlyAffordableItems') {
            setShowAffordableItems(value);
        }
    };


    useEffect(() => {
        fetchEquipmentData()
            .then((data) => setEquipmentData(data))
            .catch((error) => console.error('Error fetching equipment data:', error));
    }, []);


    useEffect(() => {
        fetch('/miscjson/levelGold.json')
            .then((response) => response.json())
            .then((data) => setLevelData(data))
            .catch((error) => console.error('Error loading level data:', error));
    }, []);

    useEffect(() => {
        const levelInfo = levelData.find((entry) => entry.level === characterLevel);
        if (levelInfo) {
            setLumpSum(levelInfo.lumpSum);
        }
    }, [characterLevel, levelData]);


    const handleLevelChange = (newLevel: number) => {
        setCharacterLevel(newLevel);
    };

    const handleAddItem = (item: ManifestItem) => {
        setSelectedItems((prevItems) => [...prevItems, item]);
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [selectedItems.length]: 1,
        }));
    };

    const handleRemoveItem = (index: number) => {
        setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[index];
            return newQuantities;
        });
    };

    const handleQuantityChange = (index: number, delta: number) => {
        setQuantities((prevQuantities) => {
            const currentQuantity = prevQuantities[index] || 1;
            const newQuantity = Math.max(1, currentQuantity + delta);
            return {
                ...prevQuantities,
                [index]: newQuantity,
            };
        });
    };

    useEffect(() => {
        // Calculate total price based on selectedItems and quantities
        const newTotal = selectedItems.reduce(
            (acc: TotalPrice, item: ManifestItem, index: number) => {
                const quantity = quantities[index] || 1;
                const itemPrice = item.price?.value || { cp: 0, sp: 0, gp: 0, pp: 0 };

                return {
                    cp: acc.cp + (itemPrice.cp ?? 0) * quantity,
                    sp: acc.sp + (itemPrice.sp ?? 0) * quantity,
                    gp: acc.gp + (itemPrice.gp ?? 0) * quantity,
                    pp: acc.pp + (itemPrice.pp ?? 0) * quantity,
                };
            },
            { cp: 0, sp: 0, gp: 0, pp: 0 }
        );

        setTotalPrice(newTotal);
    }, [selectedItems, quantities]);

    // Simplify the total price for display
    const simplifiedTotalPrice = simplifyPrice(totalPrice);

    return (
        <div>
            <div className="container">
                <h1>PF2e Equipment Picker</h1>
                <CharacterLevel
                    level={characterLevel}
                    onLevelChange={setCharacterLevel}
                    lumpSum={lumpSum}
                    setLumpSum={setLumpSum} />
                <ItemList
                    items={equipmentData}
                    onAddItem={handleAddItem}
                    showNoPriceItems={showNoPriceItems} />
                <SelectedItems
                    items={selectedItems}
                    totalPrice={formatPrice(simplifiedTotalPrice)}
                    onRemoveItem={handleRemoveItem}
                    onQuantityChange={handleQuantityChange}
                />
            </div><footer style={{ position: 'fixed', bottom: 0, width: '100%', padding: '10px', textAlign: 'center' }}>
                <Toggle
                    label="Show items with no price"
                    onToggle={(value) => handleToggleChange('showNoPriceItems', value)}
                    checked={showNoPriceItems}
                />
                <Toggle
                    label="Show only affordable items"
                    onToggle={(value) => handleToggleChange('showOnlyAffordableItems', value)}
                    checked={showAffordableItems}
                />
            </footer>
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
