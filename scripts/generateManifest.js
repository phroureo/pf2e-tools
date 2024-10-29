const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '../../pf2eitems/packs/equipment')
const manifestDir = path.join(__dirname, '../public/equipmentmanifests'); // New folder for manifest chunks

//remove the manifest directory if it exists
if (fs.existsSync(manifestDir)) {
    fs.rmSync(manifestDir, { recursive: true, force: true });
}

//make the manifest directory
fs.mkdirSync(manifestDir);

// Set to track unique items by name (or any other unique property like 'file' if preferred)
const uniqueItems = new Set();

fs.readdir(source, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter out only .json files
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const itemsWithDetails = [];

    jsonFiles.forEach((file, index) => {
        const filePath = path.join(source, file);

        // Read each file to check if it has a price
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const item = JSON.parse(fileData);

        // Check if the item has a price and if it's unique by name
        if (
            !uniqueItems.has(item.name) // Check if this item is already processed
        ) {
            // Add the item name to the set of processed items to avoid duplicates
            uniqueItems.add(item.name);

            let text = item.system.description?.value;
            // 1. @Template[cone|distance:30] -> 30 foot cone
            text = text.replace(/@Template\[(\w+)\|distance:(\d+)]/g, "$2 foot $1");

            // 2. @UUID[Compendium.pf2e.spells-srd.Item.Detect Magic] -> Detect Magic
            text = text.replace(/@UUID\[Compendium\.pf2e\.\w+-srd\.Item\.(.*?)\]/g, "$1");

            // 3. @UUID[Compendium.pf2e.actionspf2e.Item.Grapple] -> Grapple
            text = text.replace(/@UUID\[Compendium\.pf2e\.\w+\.Item\.(.*?)\]/g, "$1");

            // 4. @Damage[2d10[force]] -> 2d10 Force
            text = text.replace(/@Damage\[(\d+d\d+)\[(\w+)]\]/g, "$1 $2");

            // 5. @Check[reflex|dc:40|traits:death,force|basic] -> DC 40 Reflex
            text = text.replace(/@Check\[(\w+)\|dc:(\d+)\|.*?]/g, "DC $2 $1");

            // 6. Remove equipment effects. 
            text = text.replace(/@UUID\[Compendium\.pf2e\.equipment-effects\.Item\.Effect: .*?]/g, "");

            // 7. Fix "As creature"
            text = text.replace(/@UUID\[Compendium\.pf2e\.pathfinder-bestiary-3\.Actor\.(.*?)\]\((.*?) (\d+)\)/g, "$1 ($2, pg. $3)");

            // 8. Fix "pathfinder-monster-core.Actor.Riding Horse"
            text = text.replace(/@UUID\[Compendium\.pf2e\.pathfinder-monster-core\.Actor\.(.*?)\]/g, "$1");

            // Construct the item data for the manifest with updated file name
            const itemEntry = {
                level: item.system.level?.value || 0,
                name: item.name,
                price: item.system.price.value,
                description: text || '',
                rarity: item.system.traits?.rarity || '',
                traits: item.system.traits?.value || []
            };

            itemsWithDetails.push(itemEntry);
        }

        // When all files are processed, split into chunks and save
        if (index === jsonFiles.length - 1) {
            // Split items into chunks of 500
            const chunkSize = 100;
            for (let i = 0; i < itemsWithDetails.length; i += chunkSize) {
                const chunk = itemsWithDetails.slice(i, i + chunkSize);
                const chunkIndex = Math.floor(i / chunkSize) + 1;
                const chunkPath = path.join(manifestDir, `manifest_part_${chunkIndex}.json`);

                // Write each chunk as a separate file using fs.writeFileSync for synchronous write
                try {
                    fs.writeFileSync(chunkPath, JSON.stringify(chunk, null, 2));
                    console.log(`Manifest chunk ${chunkIndex} generated successfully:`, chunkPath);
                } catch (error) {
                    console.error(`Error writing manifest chunk ${chunkIndex}:`, error);
                }
            }
        }
    });
});
