import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import CharacterLevel from './components/CharacterLevel';
import ItemList from './components/ItemList';
import SelectedItems from './components/SelectedItems';
import ItemHighlighter from './components/Modals/ItemHighlighter'
import { fetchEquipmentData } from './utils/fetchData';
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
    const [drawerHeight, setDrawerHeight] = useState(0);

    //modals
    const [showSaveModal, setShowSaveModal] = useState(false);
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showRefreshModal, setShowRefreshModal] = useState(false);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showInformationModal, setshowInformationModal] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    //options toggles 
    const [toggles, setToggles] = useState<{ [key: string]: boolean }>({
        showNoPriceItems: false,
        showAffordableItemsOnly: true,
        showMythicItems: false,
        showRandomItem: true,
        showTheGuy: false,
    })

    // Utility to save to localStorage with Type "settings"
    const saveToLocalStorage = (key: string, data: any, type: string) => {
        localStorage.setItem(key, JSON.stringify({ Type: type, ...data }));
    };

    // Toggle handler
    const handleToggleChange = (toggleName: string, value: boolean) => {
        const updatedToggles = { ...toggles, [toggleName]: value };
        setToggles(updatedToggles);
        saveToLocalStorage("toggles", updatedToggles, "settings");
    };

    // Calculate total and available copper
    const calculateTotalPrice = (items: ManifestItem[], quantities: Record<number, number>) => {
        return items.reduce(
            (acc, item, index) => {
                const quantity = quantities[index] || 1;
                const { cp = 0, sp = 0, gp = 0, pp = 0 } = item.price?.value || {};
                return {
                    cp: acc.cp + cp * quantity,
                    sp: acc.sp + sp * quantity,
                    gp: acc.gp + gp * quantity,
                    pp: acc.pp + pp * quantity,
                };
            },
            { cp: 0, sp: 0, gp: 0, pp: 0 }
        );
    };

    const calculateAvailableCopper = (lumpSum: number, totalPrice: TotalPrice) => {
        const totalCopper = totalPrice.cp + totalPrice.sp * 10 + totalPrice.gp * 100 + totalPrice.pp * 1000;
        return lumpSum * 100 - totalCopper;
    };

    useEffect(() => {
        // Load initial data from localStorage
        const savedToggles = JSON.parse(localStorage.getItem("toggles") || "{}");
        if (savedToggles.Type === "settings") setToggles(savedToggles);

        fetchEquipmentData()
            .then(setEquipmentData)
            .catch((error) => console.error("Error fetching equipment data:", error));

        fetch("/miscjson/levelGold.json")
            .then((response) => response.json())
            .then(setLevelData)
            .catch((error) => console.error("Error loading level data:", error));
    }, []);

    useEffect(() => {
        if (characterLevel) {
            const levelInfo = levelData.find((entry) => entry.level === characterLevel);
            if (levelInfo) setLumpSum(levelInfo.lumpSum);
        }
    }, [characterLevel, levelData]);

    useEffect(() => {
        const newTotal = calculateTotalPrice(selectedItems, quantities);
        setTotalPrice(newTotal);
        setAvailableCopper(calculateAvailableCopper(lumpSum, newTotal));
    }, [selectedItems, quantities, lumpSum]);

    // Handlers
    const addRandomAffordableItem = () => {
        const affordableItems = equipmentData.filter((item) => {
            const itemTotalCopper =
                (item.price?.value?.cp ?? 0) + (item.price?.value?.sp ?? 0) * 10 +
                (item.price?.value?.gp ?? 0) * 100 + (item.price?.value?.pp ?? 0) * 1000;
            return itemTotalCopper <= availableCopper && itemTotalCopper > 0;
        });

        if (affordableItems.length > 0) {
            const randomItem = affordableItems[Math.floor(Math.random() * affordableItems.length)];
            handleAddItem(randomItem);
        }
    };

    const handleAddItem = (item: ManifestItem) => {
        setSelectedItems((prevItems) => [...prevItems, item]);
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [selectedItems.length]: 1,
        }));
    };

    const handleDelete = () => setRefreshKey((prevKey) => prevKey + 1);

    const handleConfirmRefresh = async () => {
        try {
            const data = await fetchEquipmentData(true);
            setEquipmentData(data);
            setShowRefreshModal(false);
            setShowConfirmationModal(true);
        } catch (error) {
            console.error("Error refreshing equipment data:", error);
        }
    };

    const handleSaveData = (name: string, overwrite = false) => {
        const saveKey = overwrite ? name : `${name}_${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}`;
        const dataToSave = {
            Type: "saveData",
            name,
            Date: Date.now().toLocaleString(),
            selectedItems,
            characterLevel,
            quantities,
            lumpSum,
        };
        localStorage.setItem(saveKey, JSON.stringify(dataToSave));
        setSavedName(name);
    };

    const handleLoadData = (name: string) => {
        const savedData = JSON.parse(localStorage.getItem(name) || "{}");
        if (savedData) {
            setSelectedItems(savedData.selectedItems || []);
            setCharacterLevel(savedData.characterLevel);
            setQuantities(savedData.quantities || {});
            setLumpSum(savedData.lumpSum);
            setSavedName(name);
        }
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

    const handleDrawerBodyHeight = (height: number) => {
        setDrawerHeight(height);
    };

    const toggleSettings = () => setShowSettings((prev) => !prev);

    const handleRemoveItem = (index: number) => {
        setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
        setQuantities((prevQuantities) => {
            const newQuantities = { ...prevQuantities };
            delete newQuantities[index];
            return newQuantities;
        });
    };

    const handleQuantityChange = (index: number, delta: number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [index]: Math.max(1, (prevQuantities[index] || 1) + delta),
        }));
    };



    return (
        <>
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
                {/* Main content layout with ItemHighlighter positioned to the right */}
                <div className="main-content-wrapper">
                    <div className="main-content">
                        <div className="character-item-content">
                            <CharacterLevel
                                level={characterLevel}
                                onLevelChange={setCharacterLevel}
                                lumpSum={lumpSum}
                                setLumpSum={setLumpSum} />
                            <div className='item-list'>
                                <ItemList
                                    items={equipmentData}
                                    onAddItem={handleAddItem}
                                    showNoPriceItems={toggles.showNoPriceItems}
                                    showAffordableItemsOnly={toggles.showAffordableItemsOnly}
                                    showMythicItems={toggles.showMythicItems}
                                    availableCopper={availableCopper} />
                            </div>
                        </div>
                        <h2>Selected Items</h2>
                        <div className="selected-items-container">
                            <SelectedItems
                                items={selectedItems}
                                onRemoveItem={handleRemoveItem}
                                onQuantityChange={handleQuantityChange}
                                availableCopper={availableCopper}
                            />
                        </div>
                    </div>

                    {/* ItemHighlighter positioned to the right */}
                    <div className="item-highlighter">
                        {toggles.showTheGuy && <ItemHighlighter selectedItems={selectedItems} />}
                    </div>
                </div>
                <footer className='footer' style={{ isolation: "isolate" }}>
                    <div style={{ transform: `translateY(${drawerHeight}px)` }}>
                        {/* Button to add random affordable item */}
                        {toggles.showRandomItem && <button onClick={addRandomAffordableItem} className="random-item-button">
                            Add Random Affordable Item
                        </button>}
                        <div style={{ padding: "0px", }}>
                            {/* Overall Total Price */}
                            <h3 style={{ marginBottom: "3px" }}>Total Price: {formatPrice(totalPrice) ? formatPrice(totalPrice) : "0 gp"}</h3>
                            <div style={{ fontSize: ".85em", marginTop: "0px" }}>Remaining: {availableCopper > 0 ? copperToString(availableCopper) : "0 gp"}</div>
                        </div>
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
                        onHeightChange={handleDrawerBodyHeight}
                        onToggle={toggleSettings}
                    >
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
                        <Toggle
                            label='Show "Add Random Affordable Item" Button'
                            onToggle={(value) => handleToggleChange('showRandomItem', value)}
                            checked={toggles.showRandomItem}
                        />
                        <Toggle
                            label='Show Equipped Item Tracker'
                            onToggle={(value) => handleToggleChange('showTheGuy', value)}
                            checked={toggles.showTheGuy}
                        />
                    </SettingsDrawer>

                    {showSettings && <div className="dim-overlay" onClick={toggleSettings}></div>}

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


            </div >
        </>
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
