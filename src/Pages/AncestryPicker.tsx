import React, { useEffect, useState } from 'react';
import { Ancestry } from '../types/Ancestry';
import { FilterCondition } from '../types/FilterCondition';
import Filters from '../components/AncestryPicker/Filters';
import AbilityScoreButton from '../components/AncestryPicker/AbilityScoreButton';
import SortableTable from '../components/AncestryPicker/SortableTable';
import { createSearchCondition, SearchCondition } from '../types/SearchCondition';
import InformationModal from '../components/Modals/InformationModal';
import LicenseModal from '../components/Modals/LicenseModal';

const AncestryPicker: React.FC = () => {
    const [activeFilters, setActiveFilters] = useState<SearchCondition[]>([]);
    const [loading, setLoading] = useState(false);
    const [ancestryData, setAncestryData] = useState<Ancestry[]>([]);
    const [boostFilter, setBoostFilter] = useState<{
        [key: string]: number;
    }>({
        str: 0,
        con: 0,
        dex: 0,
        int: 0,
        wis: 0,
        cha: 0,
    });

    const [flawFilter, setFlawFilter] = useState<{
        [key: string]: number;
    }>({
        str: 0,
        con: 0,
        dex: 0,
        int: 0,
        wis: 0,
        cha: 0,
    });

    const [modalStates, setModalStates] = useState({
        informationModal: false,
        licenseModal: false,
    });


    useEffect(() => {
        // Use metadata to dynamically get keys and respect @ignoreFilter
        const keys = Reflect.ownKeys(Ancestry.prototype).filter((key) => {
            const descriptor = Reflect.getMetadata('ignoreFilter', Ancestry.prototype, key as string);
            return !descriptor; // Exclude fields with the @ignoreFilter decorator
        }) as Array<keyof Ancestry>;

        if (keys.length > 0) {
            const firstField = keys[0];
            const defCondition = createSearchCondition("name", "", "contains")
            setActiveFilters([defCondition]);
        }

        const formatBoostOrFlaw = (value: string | undefined): string => {
            if (!value) return ""; // Return an empty string if the value doesn't exist
            if (value.toLowerCase() === 'free') return 'Free'; // Special case for "Free"
            return value.slice(0, 3).toUpperCase(); // Return the first 3 characters in uppercase
        };


        const loadAncestryData = async () => {
            try {
                const response = await fetch('/miscjson/ancestry.json'); // Adjust the path to match your public folder structure
                if (!response.ok) {
                    throw new Error(`Error loading ancestry data: ${response.statusText}`);
                }

                const jsonData = await response.json();
                const mappedData = jsonData.map((item: any) => {
                    return new Ancestry(
                        item.name,
                        item.hp,
                        item.size,
                        item.speed,
                        item.boosts.map((boost: string) => formatBoostOrFlaw(boost)!), // Format boosts, ensure they're valid AbilityScores
                        formatBoostOrFlaw(item.flaw), // Format flaw or set to undefined if missing
                        item.vision,
                        item.rarity
                    );
                });
                setAncestryData(mappedData);
            } catch (error) {
                console.error('Failed to load ancestry data:', error);
            }
        };

        loadAncestryData();
    }, []);


    // Set specific modal state
    const setModalState = (modalName: keyof typeof modalStates, isOpen: boolean) => {
        setModalStates((prevState) => ({
            ...prevState,
            [modalName]: isOpen,
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


    const setAbilityBoost = (ability: string, value: number) => {
        setBoostFilter((prev) => ({
            ...prev,
            [ability]: value,
        }));
    };

    const setAbilityFlaw = (ability: string, value: number) => {
        setFlawFilter((prev) => ({
            ...prev,
            [ability]: value,
        }));
    };

    const handleUpdateFilters = (filters: SearchCondition[]) => {
        setActiveFilters(filters);
    }

    const filteredItems = ancestryData.filter((item) => {

        const matchesFilter = activeFilters.every((condition) => {
            if (condition.value === '') return true;
            if (typeof (condition.field) === 'string') {
                const term = condition.value.toString().toLowerCase();
                if (condition.field === 'name') {
                    return condition.comparison === 'contains'
                        ? item.name.toLowerCase().includes(term)
                        : !item.name.toLowerCase().includes(term);
                }
                else if (condition.field === 'size') {
                    return condition.comparison === 'contains'
                        ? item.size.toLowerCase().includes(term)
                        : !item.size.toLowerCase().includes(term);
                }
                //vision
                else if (condition.field === 'vision') {
                    return condition.comparison === 'contains'
                        ? item.vision.toLowerCase().includes(term)
                        : !item.vision.toLowerCase().includes(term);
                }
                //rarity
                else if (condition.field === 'rarity') {
                    return condition.comparison === 'contains'
                        ? item.rarity.toLowerCase() === term
                        : !(item.rarity.toLowerCase() === term);
                }
            }
            const lvlVal = parseInt(condition.value, 10);
            if (condition.field === 'hp') {
                const itemLevel = item.hp || 0;
                return condition.comparison === 'greaterThan'
                    ? itemLevel >= lvlVal
                    : condition.comparison === 'lessThan'
                        ? itemLevel <= lvlVal
                        : itemLevel === lvlVal;
            }
            else if (condition.field === 'speed') {
                const itemLevel = item.speed || 0;
                return condition.comparison === 'greaterThan'
                    ? itemLevel >= lvlVal
                    : condition.comparison === 'lessThan'
                        ? itemLevel <= lvlVal
                        : itemLevel === lvlVal;
            }

            return true;
        });

        const includeBoosts = Object.keys(boostFilter).filter((key) => boostFilter[key.toLowerCase()] === 1);
        const excludeBoosts = Object.keys(boostFilter).filter((key) => boostFilter[key.toLowerCase()] === -1);

        const matchesBoosts = includeBoosts.every((key) => item.boosts.map((b) => b.toLowerCase()).includes(key.toLowerCase())) &&
            excludeBoosts.every((key) => !item.boosts.map((b) => b.toLowerCase()).includes(key.toLowerCase()));

        const includeFlaws = Object.keys(flawFilter).filter((key) => flawFilter[key.toLowerCase()] === 1);
        const excludeFlaws = Object.keys(flawFilter).filter((key) => flawFilter[key.toLowerCase()] === -1);

        const matchesFlaws = (
            (includeFlaws.length === 0 || includeFlaws.includes(item.flaw.toLowerCase())) &&
            (excludeFlaws.length === 0 || !excludeFlaws.includes(item.flaw.toLowerCase()))
        );
        return matchesFilter && matchesBoosts && matchesFlaws;

    });

    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            <div className="main-container">
                <header className="header">
                    <h1>PF2e Ancestry Searcher</h1>
                </header>
                <div style={{ margin: "10px", gap: "8px", width: "100%", display: "flex", flexDirection: "row" }}>
                    <div style={{ width: "50%" }}>
                        <h2>Filters</h2>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ maxWidth: "60px", minWidth: "60px", alignContent: "center" }}>
                                Boosts:
                            </div>
                            {Object.entries(boostFilter).map(([ability, value]) => (
                                <AbilityScoreButton
                                    key={ability}
                                    ability={ability}
                                    value={value}
                                    setAbilityScore={setAbilityBoost}
                                />
                            ))}
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <div style={{ maxWidth: "60px", minWidth: "60px", alignContent: "center" }}>
                                Flaws:
                            </div>
                            {Object.entries(flawFilter).map(([ability, value]) => (
                                <AbilityScoreButton
                                    key={ability}
                                    ability={ability}
                                    value={value}
                                    setAbilityScore={setAbilityFlaw}
                                />
                            ))}
                        </div>

                        <Filters
                            classType={Ancestry}
                            filters={activeFilters}
                            onFiltersChange={handleUpdateFilters}
                        />
                    </div>
                    <div
                        style={{
                            margin: "10px",
                            gap: "8px",
                            width: "calc(100% - 20px)", // Account for padding/margin
                            display: "flex",
                            flexDirection: "row",
                            overflow: "hidden", // Prevent content from spilling
                            boxSizing: "border-box", // Consistent box-sizing
                        }}
                    >
                        <SortableTable data={filteredItems} />
                    </div>
                </div>
                <footer className='footer'>
                    <div className='footer-options'>
                        <button
                            className="information-button"
                            onClick={() => setModalState('informationModal', true)}
                            title="Show Site Info"
                        >
                            <img src="/misc/information.svg" alt="Information Icon" className="refresh-icon" />
                        </button>
                    </div>
                </footer>
                {modalStates.informationModal && (
                    <InformationModal
                        onClose={() => setModalState('informationModal', false)}
                        showLicenseModal={() => setModalState('licenseModal', true)}
                    />
                )}
                <LicenseModal isLicenseModalOpen={modalStates.licenseModal} closeModal={closeAllModals} />
            </div>

            {anyModalOpen && <div className="dim-overlay" onClick={closeAllModals}></div>}
        </>
    )
}

export default AncestryPicker;