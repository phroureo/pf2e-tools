import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

import CharacterLevel from './components/CharacterLevel';
import DropZone from './components/DragAndDrop/DropZone';
import ItemList from './components/ItemList';
import SelectedItems from './components/SelectedItems';
import ItemHighlighter from './components/Modals/ItemHighlighter'
import Toggle from './components/Toggle';
import Flyout from './components/Flyout';
import LoadModal from './components/Modals/LoadModal';
import SaveModal from './components/Modals/SaveModal';
import { downloadJSON, uploadJSON } from './utils/downloadJSON';
import RefreshModal from './components/Modals/RefreshModal';
import ConfirmationModal from './components/Modals/ConfirmationModal';
import InformationModal from './components/Modals/InformationModal';
import SettingsDrawer from './components/Modals/SettingsDrawer';

import { fetchEquipmentData } from './utils/fetchData';
import { formatPrice, copperToString } from './utils/formatPrice';
import { convertToEquipmentItem } from './utils/convertManifestToEquipment';

import { TotalPrice } from './types/TotalPrice';
import { LevelData } from './types/LevelData';
import { ManifestItem } from './types/ManifestItem';
import { EquipmentItem } from './types/EquipmentItem';

import './styles/styles.css';
import './styles/toggle.css';
import './styles/buttons.css';
import './styles/modal.css';
import './styles/form.css';
import './styles/input.css';
import './styles/flyout.css';
import './styles/loadingcomponent.css';
import './styles/settingsdrawer.css';
import Modal from './components/Modals/Modal';
import SmallModal from './components/Modals/SmallModal';

const Main: React.FC = () => {
    const [characterLevel, setCharacterLevel] = useState<number>(1);
    const [equipmentData, setEquipmentData] = useState<ManifestItem[]>([]);
    const [selectedItems, setSelectedItems] = useState<EquipmentItem[]>([]);
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
    const [totalPrice, setTotalPrice] = useState<TotalPrice>({ cp: 0, sp: 0, gp: 0, pp: 0 });
    const [levelData, setLevelData] = useState<LevelData[]>([]);
    const [lumpSum, setLumpSum] = useState<number>(15);
    const [availableCopper, setAvailableCopper] = useState<number>(lumpSum * 100);
    const [savedName, setSavedName] = useState<string>();
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [levelItems, setLevelItems] = useState<Record<number, number>>();
    const [draggingItem, setDraggingItem] = useState<EquipmentItem | null>(null);

    //modals
    const [modalStates, setModalStates] = useState({
        saveModal: false,
        loadModal: false,
        refreshModal: false,
        confirmationModal: false,
        informationModal: false,
        settings: false,
        itemLevelModal: false,
    });

    //options toggles 
    const [toggles, setToggles] = useState<{ [key: string]: boolean }>({
        showNoPriceItems: false,
        showAffordableItemsOnly: true,
        showMythicItems: false,
        showRandomItem: true,
        showTheGuy: false,
        showItemsByLevel: true,
    })

    const footerRef = useRef<HTMLDivElement | null>(null);
    const [footerHeight, setFooterHeight] = useState(0);
    useEffect(() => {
        if (footerRef.current) {
            const observer = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    if (entry.contentRect.height !== footerHeight) {
                        setFooterHeight(entry.contentRect.height);
                    }
                }
            });

            observer.observe(footerRef.current); // Attach observer to footerRef

            // Cleanup observer when the component unmounts
            return () => observer.disconnect();
        }
    }, [footerRef, footerHeight]);

    useEffect(() => {
        setLoading(true);
        // Load initial data from localStorage
        const savedToggles = JSON.parse(localStorage.getItem("toggles") || "{}");
        if (savedToggles.Type === "settings") setToggles(savedToggles);

        fetchEquipmentData()
            .then(setEquipmentData)
            .catch((error) => console.error("Error fetching equipment data:", error));

        fetch("/miscjson/levelGold.json")
            .then((response) => response.json())
            .then((data) => {
                // Transform the data to match the LevelData interface
                const transformedData: LevelData[] = data.map((entry: any) => ({
                    level: entry.level,
                    currency: entry.currency,
                    lumpSum: entry.lumpSum,
                    itemsByLevel: entry.items || {}  // Set itemsByLevel to items or an empty object if items is undefined
                }));

                setLevelData(transformedData);
            })
            .catch((error) => console.error("Error loading level data:", error))
            .finally(() => setLoading(false));  // Ensure loading is set to false after data is fetched

        setLoading(false);
    }, []);

    useEffect(() => {
        if (characterLevel) {
            const levelInfo = levelData.find((entry) => entry.level === characterLevel);
            if (levelInfo) {
                if (toggles.showItemsByLevel) {
                    setLumpSum(levelInfo.currency)
                } else {
                    setLumpSum(levelInfo.lumpSum);
                }
                setLevelItems(levelInfo.itemsByLevel);
            };
        }
    }, [characterLevel, levelData]);

    useEffect(() => {
        const levelInfo = levelData.find((entry) => entry.level === characterLevel);
        if (levelInfo) {
            if (toggles.showItemsByLevel) {
                setLumpSum(levelInfo.currency);
            } else {
                setLumpSum(levelInfo.lumpSum);
            }
        }
    }, [toggles])

    useEffect(() => {
        const newTotal = calculateTotalPrice(selectedItems.filter((item) => item.zone === `selectedItems`), quantities);
        setTotalPrice(newTotal);
        setAvailableCopper(calculateAvailableCopper(lumpSum, newTotal));
    }, [selectedItems, quantities, lumpSum]);

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

    // Set specific modal state
    const setModalState = (modalName: keyof typeof modalStates, isOpen: boolean) => {
        setModalStates((prevState) => ({
            ...prevState,
            [modalName]: isOpen,
        }));
    };

    const calculateAvailableCopper = (lumpSum: number, totalPrice: TotalPrice) => {
        const totalCopper = totalPrice.cp + totalPrice.sp * 10 + totalPrice.gp * 100 + totalPrice.pp * 1000;
        return lumpSum * 100 - totalCopper;
    };
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
            handleAddItem(randomItem, 'selectedItems');
        }
    };

    const handleAddItem = (item: ManifestItem, zone: string) => {
        setSelectedItems((prevItems) => [...prevItems, convertToEquipmentItem(item, zone)]);
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [selectedItems.length]: 1,
        }));
    };

    const updateItemZone = (draggedItem: EquipmentItem, newZone: string) => {
        setSelectedItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                // Only change the zone for the dragged item by ID
                item.id === draggedItem.id ? { ...item, zone: newZone } : item
            );
            return updatedItems;
        });
    };

    const reorderItemsInZone = (zoneId: string, sourceIndex: number, targetIndex: number) => {
        setSelectedItems((prevItems) => {
            const zoneItems = prevItems.filter((item) => item.zone === zoneId);
            const [movedItem] = zoneItems.splice(sourceIndex, 1);
            zoneItems.splice(targetIndex, 0, movedItem);

            return prevItems.map((item) => (item.zone === zoneId ? zoneItems.shift()! : item));
        });
    };

    const handleDelete = () => setRefreshKey((prevKey) => prevKey + 1);

    const handleConfirmRefresh = async () => {
        try {
            setLoading(true);
            const data = await fetchEquipmentData(true);
            setEquipmentData(data);
            setModalState('refreshModal', false);
            setModalState('confirmationModal', true);
            setLoading(false);
        } catch (error) {
            console.error("Error refreshing equipment data:", error);
            setLoading(false);
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
            levelItems
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
            setLevelItems(savedData.levelItems);
        }
        setModalState('loadModal', false);
    };

    const handleUploadData = (data: any) => {
        if (data) {
            setSelectedItems(data.selectedItems || []);
            setCharacterLevel(data.characterLevel || 1);
            setQuantities(data.quantities || {});
            setLumpSum(data.lumpSum || 15);
        }
    };

    const handleRemoveItem = (index: number) => {
        setSelectedItems((prevItems) => {
            const newItems = prevItems.filter((_, i) => i !== index);
            return [...newItems]; // Ensure new array reference for React to detect changes
        });
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

    const updateLevelItems = (level: number, inc: number) => {
        setLevelItems((prev) => {
            const newItems = { ...prev };

            if (newItems[level]) {
                // Update the count based on inc
                newItems[level] += inc;

                if (newItems[level] <= 0) {
                    // Move all items to "selectedItems" before removing the level
                    moveExcessItemsToSelectedItems(level, 0);

                    // Now delete the level since its count is zero or below
                    delete newItems[level];
                } else {
                    // Move excess items if the count was reduced but still positive
                    moveExcessItemsToSelectedItems(level, newItems[level]);
                }
            } else if (inc > 0) {
                // Initialize level if it doesn't exist and inc is positive
                newItems[level] = inc;
            }

            return Object.fromEntries(
                Object.entries(newItems)
                    .map(([key, value]) => [parseInt(key), value])
                    .sort(([a], [b]) => a - b)
            );
        });

        setModalState('itemLevelModal', false);
    };

    // Function to move excess or all items to "selectedItems" if count is reduced or zero
    const moveExcessItemsToSelectedItems = (level: number, maxSlots: number) => {
        setSelectedItems((prevSelectedItems) => {
            const levelZoneId = `${level}dz`;
            const levelItems = prevSelectedItems.filter((item) => item.zone === levelZoneId);
            // Move all items to "selectedItems" if maxSlots is zero, otherwise move only excess items
            const itemsToMove = maxSlots === 0 ? levelItems : levelItems.slice(maxSlots);
            const itemsToKeep = maxSlots > 0 ? levelItems.slice(0, maxSlots) : [];

            if (itemsToMove.length > 0) {
                // Update the zone of items to move to "selectedItems"
                const updatedExcessItems = itemsToMove.map((item) => ({
                    ...item,
                    zone: "selectedItems",
                }));

                return [
                    ...prevSelectedItems.filter((item) => item.zone !== levelZoneId),
                    ...itemsToKeep,
                    ...updatedExcessItems,
                ];
            }
            return prevSelectedItems;
        });
    };



    // Generic toggle function
    const toggleModal = (modalName: keyof typeof modalStates) => {
        setModalStates((prevState) => ({
            ...prevState,
            [modalName]: !prevState[modalName],
        }));
    };


    // Check if any modal is open
    const anyModalOpen = Object.values(modalStates).some((isOpen) => isOpen);

    const closeAllModals = () => {
        setModalStates((prevState) => {
            const updatedStates = { ...prevState };
            for (const key in updatedStates) {
                updatedStates[key as keyof typeof modalStates] = false;
            }
            return updatedStates;
        });
    };

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="main-container">
                <header className="header">
                    <h1>PF2e Equipment Tracker</h1>
                    <div className="flyout-container">
                        <Flyout
                            saveData={() => setModalState('saveModal', true)}
                            loadData={() => setModalState('loadModal', true)}
                            onDownload={() => downloadJSON({ selectedItems, levelData, quantities, lumpSum })}
                            onUpload={(e) => uploadJSON(e, handleUploadData)}
                        />
                    </div>
                    {modalStates.saveModal && <SaveModal
                        onSave={handleSaveData}
                        onClose={() => setModalState('saveModal', false)}
                        isEdit={savedName ? true : false}
                        savedName={savedName}
                    />}
                    {modalStates.loadModal && <LoadModal
                        onLoad={handleLoadData}
                        onDelete={handleDelete}
                        onClose={() => setModalState('loadModal', false)}
                    />}
                </header>
                {/* Main content layout with ItemHighlighter positioned to the right */}
                <div className="main-content-wrapper">
                    <div className='three-columns'>
                        {toggles.showItemsByLevel &&
                            <div style={{ textAlign: 'center', padding: '10px', marginBottom: "40px", maxHeight: "100%" }}>
                                <h2>Items by Level</h2>
                                <button onClick={() => setModalState('itemLevelModal', true)} className='add-level-item-button'>
                                    <img src="/misc/plus.svg" alt="Plus Sign" className="refresh-icon" />
                                    Add Level Item
                                </button>
                                <div style={{ overflowY: "visible", }}>
                                    {Object.entries(levelItems || {}).map(([level, itemCount]) => (
                                        <div key={level}>
                                            <h2>Level {level}</h2>
                                            <ul style={{ gap: "8px" }}>
                                                <DropZone
                                                    zoneId={`${level}dz`}
                                                    maxSlots={itemCount}
                                                    slotLevel={Number(level)}
                                                    style={{ background: "#23243a" }}
                                                    items={selectedItems.filter((item) => item.zone === `${level}dz`)}
                                                    quantityChangeEnabled={false}
                                                    handleQuantityChange={handleQuantityChange}
                                                    handleRemoveItem={handleRemoveItem}
                                                    updateItemZone={updateItemZone}
                                                    reorderItemsInZone={reorderItemsInZone}
                                                    draggingItem={draggingItem}
                                                    setDraggingItem={setDraggingItem}
                                                    highlightBorder={true}
                                                    updateLevelItems={updateLevelItems}
                                                    enableFilteredModal={true}
                                                    allEquipment={equipmentData}
                                                    handleAddItem={handleAddItem}
                                                />
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                    <div className='three-columns'>
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
                        <div className="selected-items-container" style={{
                            minHeight: `calc(100vh - 350px - ${toggles.showRandomItem ? 50 : 0}px)`,
                            maxHeight: `calc(100vh - 350px - ${toggles.showRandomItem ? 50 : 0}px)`,
                        }}>
                            <SelectedItems
                                key={selectedItems.map(item => item.id).join('-')} // Ensures re-render on state change
                                items={selectedItems.filter((item) => item.zone === `selectedItems`)}
                                onQuantityChange={handleQuantityChange}
                                handleRemoveItem={handleRemoveItem}
                                updateItemZone={updateItemZone}
                                reorderItemsInZone={reorderItemsInZone}
                                draggingItem={draggingItem}
                                setDraggingItem={setDraggingItem}
                                allEquipment={equipmentData}
                                handleAddItem={handleAddItem}
                            />
                        </div>
                    </div>
                    <div style={{ width: "33%" }}>
                        {toggles.showTheGuy &&
                            <div className="item-highlighter">
                                <ItemHighlighter selectedItems={selectedItems} />
                            </div>
                        }
                    </div>
                </div>
                <footer className='footer' ref={footerRef}>
                    <div className="footer-content">
                        {toggles.showRandomItem && (
                            <div className="random-item-container">
                                <button onClick={addRandomAffordableItem} className="random-item-button">
                                    Add Random Affordable Item
                                </button>
                            </div>
                        )}
                        <div style={{ padding: "0px", }}>
                            {/* Overall Total Price */}
                            <h3 style={{ marginBottom: "3px" }}>Total Price: {formatPrice(totalPrice) ? formatPrice(totalPrice) : "0 gp"}</h3>
                            <div style={{ fontSize: ".85em", marginTop: "0px" }}>Remaining: {availableCopper > 0 ? copperToString(availableCopper) : "0 gp"}</div>
                        </div>
                    </div>
                    <div className='footer-options'>
                        <button
                            className="information-button"
                            onClick={() => setModalState('informationModal', true)}
                            title="Show Site Info"
                        >
                            <img src="/misc/information.svg" alt="Information Icon" className="refresh-icon" />
                        </button>
                        <button
                            className="refresh-button"
                            onClick={() => setModalState('refreshModal', true)}
                            title="Refresh Cache"
                        >
                            <img src="/misc/refreshicon.svg" alt="Refresh Icon" className="refresh-icon" />
                        </button>
                    </div>
                </footer>

                {modalStates.refreshModal && (
                    <RefreshModal
                        onConfirm={handleConfirmRefresh}
                        onClose={() => setModalState('refreshModal', false)}
                    />
                )}
                {modalStates.confirmationModal && (
                    <ConfirmationModal
                        message="Data updated from server!"
                        onClose={() => setModalState('confirmationModal', false)}
                    />
                )}
                {modalStates.informationModal && (
                    <InformationModal
                        onClose={() => setModalState('informationModal', false)} />
                )}
                <SmallModal isOpen={modalStates.itemLevelModal}
                    onClose={() => toggleModal('itemLevelModal')}>
                    <div>
                        <div className="level-buttons-grid">
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((level) => (
                                <button key={level} onClick={() => updateLevelItems(level, 1)}>
                                    {level}
                                </button>
                            ))}
                        </div>
                    </div>
                </SmallModal>

                {/* Settings Drawer */}
                <SettingsDrawer
                    isOpen={modalStates.settings}
                    drawerTitle='Settings'
                    onToggle={() => toggleModal('settings')}
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
                    <Toggle
                        label='Use Items By Level'
                        onToggle={(value) => handleToggleChange('showItemsByLevel', value)}
                        checked={toggles.showItemsByLevel}
                    />
                </SettingsDrawer>

            </div >

            {anyModalOpen && <div className="dim-overlay" onClick={closeAllModals}></div>}
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
