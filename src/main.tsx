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
import './styles/flyout.css';
import './styles/settingsdrawer.css';
import { ManifestItem } from './types/ManifestItem';
import Toggle from './components/Toggle';
import Flyout from './components/Flyout';
import LoadModal from './components/Modals/LoadModal';
import SaveModal from './components/Modals/SaveModal';
import { downloadJSON, uploadJSON } from './utils/downloadJSON';
import RefreshModal from './components/Modals/RefreshModal';
import ConfirmationModal from './components/Modals/ConfirmationModal';
import InformationModal from './components/Modals/InformationModal';
import SettingsDrawer from './components/BottomDrawer';

const Main: React.FC = () => {
    const [characterLevel, setCharacterLevel] = useState<number>(1);
    const [equipmentData, setEquipmentData] = useState<ManifestItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<ManifestItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [totalPrice, setTotalPrice] = useState<TotalPrice>({ cp: 0, sp: 0, gp: 0, pp: 0 });
    const [levelData, setLevelData] = useState<LevelData[]>([]);
    const [lumpSum, setLumpSum] = useState<number>(15);
    const [availableCopper, setAvailableCopper] = useState<number>(lumpSum * 100);
    const [savedName, setSavedName] = useState<string>();
    const [refreshKey, setRefreshKey] = useState(0);

    //modals
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showRefreshModal, setShowRefreshModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showInformationModal, setshowInformationModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    
    //options toggles 
    const [toggles, setToggles] = useState<{ [key: string]: boolean}>({
        showNoPriceItems: false,
        showAffordableItemsOnly: true,
        showMythicItems: false,
    })

    const toggleSettings = () => setShowSettings(!showSettings);


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

    const handleSaveData = (name: string, overwrite = false) => {
        const formattedDate = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
        const saveKey = overwrite || name === savedName ? name : `${name}_${formattedDate}`;
        
        const dataToSave = {
            Type: "saveData",
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

    useEffect(() => {
        // Retrieve and parse the saved toggles with Type = "settings"
        const savedToggles = JSON.parse(localStorage.getItem('toggles') || '{}');
        if (savedToggles.Type === "settings") {
            setToggles(savedToggles);
        }
    }, []);
    

    const handleToggleChange = (toggleName: string, value: boolean) => {
        const updatedToggles = {
            ...toggles,
            [toggleName]: value,
        };
        setToggles(updatedToggles);
    
        // Save updated toggles to localStorage with Type = "settings"
        const settingsToSave = {
            Type: "settings",
            ...updatedToggles,
        };
        localStorage.setItem('toggles', JSON.stringify(settingsToSave));
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
            <header className="header">
                <h1>PF2e Equipment Tracker</h1>
                <div className="flyout-container">
                    <Flyout
                        saveData={() => setShowSaveModal(true)}
                        loadData={() => setShowLoadModal(true)}
                        onDownload={() => downloadJSON({ selectedItems, levelData, quantities, lumpSum })}
                        onUpload={(e) => uploadJSON(e, handleUploadData)}
                    />
                </div>
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
                    <CharacterLevel
                        level={characterLevel}
                        onLevelChange={setCharacterLevel}
                        lumpSum={lumpSum}
                        setLumpSum={setLumpSum} />
                    <ItemList
                        items={equipmentData}
                        onAddItem={handleAddItem}
                        showNoPriceItems={toggles.showNoPriceItems}
                        showAffordableItemsOnly={toggles.showAffordableItemsOnly}
                        showMythicItems={toggles.showMythicItems}
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
                <div style={{ padding: "0px" }}>
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
                    <button
                        className="refresh-button"
                        onClick={() => setShowRefreshModal(true)}
                        title="Refresh Cache"
                    >
                        <img src="/misc/refreshicon.svg" alt="Refresh Icon" className="refresh-icon" />
                    </button>
                </footer>

                {/* Settings Drawer */}
                <SettingsDrawer
                    isOpen={showSettings}
                    drawerTitle='Settings'
                    onToggle={toggleSettings}>
                    <Toggle
                        label="Show items with no price"
                        onToggle={(value) => handleToggleChange('showNoPriceItems', value)}
                        checked={toggles.showNoPriceItems}
                    />
                    <Toggle
                        label="Show only affordable items"
                        onToggle={(value) => handleToggleChange('showAffordableItemsOnly', value)}
                        checked={toggles.showAffordableItemsOnly}
                    />
                    <Toggle
                        label="Show Mythic items"
                        onToggle={(value) => handleToggleChange('showMythicItems', value)}
                        checked={toggles.showMythicItems}
                    />
                </SettingsDrawer>
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
                    onClose={() => setshowInformationModal(false)} />
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
