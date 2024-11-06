import { ManifestItem } from '../types/ManifestItem';
import LZString from 'lz-string';

const CACHE_KEY = 'equipmentDataCache';
const CACHE_TIMESTAMP_KEY = 'equipmentDataTimestamp';
const CACHE_EXPIRY_DAYS = 7;
const MILLISECONDS_IN_A_DAY = 86400000;

export const fetchEquipmentData = async (forceRefresh = false): Promise<ManifestItem[]> => {
    // Check if cached data is available and not expired
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    const cacheExpired = cachedTimestamp && (Date.now() - parseInt(cachedTimestamp) > CACHE_EXPIRY_DAYS * MILLISECONDS_IN_A_DAY);

    if (cachedData && !cacheExpired && !forceRefresh) {
        console.log('Returning cached equipment data');
        return JSON.parse(LZString.decompress(cachedData));
    }

    // Fetch new data if cache is expired or force refresh is enabled
    const equipmentData: ManifestItem[] = [];
    let partIndex = 1;

    try {
        while (true) {
            const manifestFileName = `/equipmentmanifests/manifest_part_${partIndex}.json`;
            console.log(`Fetching manifest part: ${manifestFileName}`);
            const manifestResponse = await fetch(manifestFileName);

            if (!manifestResponse.ok) {
                console.log(`No more manifest parts found after part ${partIndex - 1}.`);
                break;
            }

            const manifestItems: {
                file: string;
                level: number;
                name: string;
                price: { gp?: number; sp?: number; cp?: number; pp?: number };
                description: string;
                rarity: string;
                traits: string[];
                usage: string;
                worn: string;
                publication: string;
            }[] = await manifestResponse.json();

            for (const item of manifestItems) {
                try {
                    const manifestItem: ManifestItem = {
                        id: item.name,
                        name: item.name,
                        level: item.level,
                        price: {
                            value: {
                                cp: item.price.cp ?? 0,
                                sp: item.price.sp ?? 0,
                                gp: item.price.gp ?? 0,
                                pp: item.price.pp ?? 0,
                            }
                        },
                        description: item.description,
                        rarity: item.rarity,
                        traits: item.traits,
                        usage: item.usage,
                        worn: item.worn,
                        publication: item.publication
                    };
                    equipmentData.push(manifestItem);
                } catch (itemError) {
                    console.error(`Error processing item with file ID: ${item.file}`, itemError);
                }
            }

            partIndex++;
        }
    } catch (error) {
        console.error('Error fetching equipment data:', error);
    }

    // Cache the fetched data
    const compressedData = LZString.compress(JSON.stringify(equipmentData));
    localStorage.setItem(CACHE_KEY, compressedData);
    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    console.log(`Fetched total equipment items: ${equipmentData.length}`);
    
    return equipmentData;
};

// Force refresh function to be called from a button
export const forceRefreshCache = async (): Promise<ManifestItem[]> => {
    console.log('Forcing cache refresh');
    return await fetchEquipmentData(true);
};
