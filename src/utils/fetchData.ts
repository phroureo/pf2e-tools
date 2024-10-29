import { ManifestItem } from '../types/ManifestItem';

export const fetchEquipmentData = async (): Promise<ManifestItem[]> => {
    const equipmentData: ManifestItem[] = [];
    let partIndex = 1;

    try {
        while (true) {
            // Attempt to fetch the next part of the manifest
            const manifestFileName = `/equipmentmanifests/manifest_part_${partIndex}.json`;
            console.log(`Fetching manifest part: ${manifestFileName}`);
            const manifestResponse = await fetch(manifestFileName);

            if (!manifestResponse.ok) {
                console.log(`No more manifest parts found after part ${partIndex - 1}.`);
                break; // Exit loop if no more parts are found
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
            }[] = await manifestResponse.json();

            // Convert manifest items to ManifestItem structure
            for (const item of manifestItems) {
                try {
                    const manifestItem: ManifestItem = {
                        id: item.file,
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
                    };
                    equipmentData.push(manifestItem);
                }
                catch (itemError) {
                    console.error(`Error processing item with file ID: ${item.file}`, itemError);
                }

            }

            partIndex++; // Move to the next manifest part
        }
    } catch (error) {
        console.error('Error fetching equipment data:', error);
    }

    console.log(`Fetched total equipment items: ${equipmentData.length}`);
    return equipmentData;
};
