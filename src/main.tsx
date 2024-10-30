import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CharacterLevel from './components/CharacterLevel';
import ItemList from './components/ItemList';
import SelectedItems from './components/SelectedItems';
import { fetchEquipmentData } from './utils/fetchData';
import { EquipmentItem } from './types/EquipmentItem';
import { TotalPrice } from './types/TotalPrice';
import { LevelData } from './types/LevelData';
import { simplifyPrice, formatPrice, copperToString } from './utils/formatPrice';
import './styles/styles.css';
import './styles/toggle.css';
import './styles/buttons.css';
import './styles/modal.css';
import './styles/form.css';
import './styles/input.css';
import { ManifestItem } from './types/ManifestItem';
import Toggle from './components/Toggle';

import Header from './components/Header';
import LoadModal from './components/Modals/LoadModal';
import SaveModal from './components/Modals/SaveModal';
import { downloadJSON, uploadJSON } from './utils/downloadJSON';
import RefreshModal from './components/Modals/RefreshModal';
import ConfirmationModal from './components/Modals/ConfirmationModal';
import InformationModal from './components/Modals/InformationModal';

const Main: React.FC = () => {
    const [characterLevel, setCharacterLevel] = useState<number>(1);
    const [equipmentData, setEquipmentData] = useState<ManifestItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<ManifestItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [totalPrice, setTotalPrice] = useState<TotalPrice>({ cp: 0, sp: 0, gp: 0, pp: 0 });
    const [showNoPriceItems, setShowNoPriceItems] = useState<boolean>(false);
    const [showAffordableItemsOnly, setShowAffordableItemsOnly] = useState<boolean>(true);
    const [levelData, setLevelData] = useState<LevelData[]>([]);
    const [lumpSum, setLumpSum] = useState<number>(15);
    const [availableCopper, setAvailableCopper] = useState<number>(lumpSum * 100);
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [savedName, setSavedName] = useState<string>();
    const [refreshKey, setRefreshKey] = useState(0);
    const [showRefreshModal, setShowRefreshModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showInformationModal, setshowInformationModal] = useState(false);

    const handleDelete = (name: string) => {
        // Force re-fetch by updating the refresh key
        setRefreshKey(prevKey => prevKey + 1);
    };

    // Handle refresh confirmation and show success message upon completion
    const handleConfirmRefresh = async () => {
        try {
            const data = await fetchEquipmentData(true);
            setEquipmentData(data);
            setShowRefreshModal(false); // Close refresh modal
            setShowConfirmationModal(true); // Show confirmation modal
        } catch (error) {
            console.error('Error refreshing equipment data:', error);
        }
    };

    const handleShowInformation = async () => {
        try {
            setshowInformationModal(true);
        } catch (error) {
            console.error('Error showing information modal:', error);
        }
    }

    const handleSaveData = (name: string, overwrite = false) => {
        const saveKey = overwrite || name === savedName ? name : `${name}`;
        const dataToSave = {
            name,
            Date: Date.now().toLocaleString(),
            selectedItems,
            characterLevel,
            quantities,
            lumpSum
        };
        localStorage.setItem(saveKey, JSON.stringify(dataToSave));
        setSavedName(name);
    };

    const handleLoadData = (name: string) => {
        const savedData = JSON.parse(localStorage.getItem(name) || '{}');
        setSelectedItems(savedData.selectedItems || []);
        setCharacterLevel(savedData.characterLevel);
        setQuantities(savedData.quantities || {});
        setLumpSum(savedData.lumpSum);
        console.log(savedName);
        setSavedName(name);
        console.log(savedName);
        setShowLoadModal(false);
    };


    const handleUploadData = (data: any) => {
        if (data) {
            setSelectedItems(data.selectedItems || []);
            setCharacterLevel(data.characterLevel || 1);
            setQuantities(data.quantities || {});
            setLumpSum(data.lumpSum || 15);
        }
    };

    const handleToggleChange = (toggleName: string, value: boolean) => {
        if (toggleName === 'showNoPriceItems') {
            setShowNoPriceItems(value);
        } else if (toggleName === 'showOnlyAffordableItems') {
            setShowAffordableItemsOnly(value);
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
        // Calculate total price in copper pieces
        const totalCopper = (totalPrice.cp ?? 0) + (totalPrice.sp ?? 0) * 10 + (totalPrice.gp ?? 0) * 100 + (totalPrice.pp ?? 0) * 1000;

        // Calculate available gold by subtracting total price from lump sum (also in copper pieces)
        const availableCopper = lumpSum * 100 - totalCopper;

        // Convert copper back to gp, sp, and cp format
        const pp = Math.floor(availableCopper / 1000);
        const gp = Math.floor((availableCopper % 1000) / 100);
        const sp = Math.floor((availableCopper % 100) / 10);
        const cp = availableCopper % 10;

        // Set available gold in the required format
        setAvailableCopper(availableCopper);
        console.log(availableCopper);
    }, [lumpSum, totalPrice]);

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
            <header>
                <Header
                    saveData={() => setShowSaveModal(true)}
                    loadData={() => setShowLoadModal(true)}
                    onDownload={() => downloadJSON({ selectedItems, levelData, quantities, lumpSum })}
                    onUpload={(e) => uploadJSON(e, handleUploadData)}
                />
                {showSaveModal && <SaveModal
                    onSave={handleSaveData}
                    onClose={() => setShowSaveModal(false)}
                    isEdit={savedName ? true : false}
                    savedName={savedName}
                />}
                {showLoadModal && <LoadModal
                    onLoad={handleLoadData}
                    onDelete={handleDelete}
                    onClose={() => setShowLoadModal(false)}
                />}
            </header>
            <div className="container">
                <div className='container-inner'>
                    <h1>PF2e Equipment Picker</h1>
                    <CharacterLevel
                        level={characterLevel}
                        onLevelChange={setCharacterLevel}
                        lumpSum={lumpSum}
                        setLumpSum={setLumpSum} />
                    <ItemList
                        items={equipmentData}
                        onAddItem={handleAddItem}
                        showNoPriceItems={showNoPriceItems}
                        showAffordableItemsOnly={showAffordableItemsOnly}
                        availableCopper={availableCopper} />
                </div>
                <h2>Selected Items</h2>
                <div className='selected-items-container'>
                    <SelectedItems
                        items={selectedItems}
                        onRemoveItem={handleRemoveItem}
                        onQuantityChange={handleQuantityChange}
                        availableCopper={availableCopper}
                    />
                </div>
            </div>
            <footer className='footer'>
                <div style={{ padding: "20px" }}>
                    {/* Overall Total Price */}
                    <h3 style={{ marginBottom: "3px" }}>Total Price: {formatPrice(totalPrice) ? formatPrice(totalPrice) : "0 gp"}</h3>
                    <div style={{ fontSize: ".85em", marginTop: "0px" }}>Remaining: {availableCopper > 0 ? copperToString(availableCopper) : "0 gp"}</div>
                </div>
                <footer className='footer-options'>
                    <button
                        className="information-button"
                        onClick={() => setshowInformationModal(true)}
                        title="Show Site Info"
                    >
                    <img src="/misc/information.svg" alt="Information Icon" className="refresh-icon" />
                </button>
                    <Toggle
                        label="Show items with no price"
                        onToggle={(value) => handleToggleChange('showNoPriceItems', value)}
                        checked={showNoPriceItems}
                    />
                    <Toggle
                        label="Show only affordable items"
                        onToggle={(value) => handleToggleChange('showOnlyAffordableItems', value)}
                        checked={showAffordableItemsOnly}
                    />
                    <button
                        className="refresh-button"
                        onClick={() => setShowRefreshModal(true)}
                        title="Refresh Cache"
                    >
                        <img src="/misc/refreshicon.svg" alt="Refresh Icon" className="refresh-icon" />
                    </button>
                </footer>
            </footer>
            {showRefreshModal && (
                <RefreshModal
                    onConfirm={handleConfirmRefresh}
                    onClose={() => setShowRefreshModal(false)}
                />
            )}
            {showConfirmationModal && (
                <ConfirmationModal
                    message="Data updated from server!"
                    onClose={() => setShowConfirmationModal(false)}
                />
            )}
            {showInformationModal && (
                <InformationModal
                onClose={() => setshowInformationModal(false)}/>
            )}
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
