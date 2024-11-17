const fs = require('fs');
const path = require('path');
const { json } = require('stream/consumers');

const source = path.join(__dirname, '../../pf2eitems/packs/equipment')
const manifestDir = path.join(__dirname, '../public/equipmentmanifests'); // New folder for manifest chunks
const miscJsonDir = path.join(__dirname, '../public/miscjson');

//remove the manifest directory if it exists
if (fs.existsSync(manifestDir)) {
    fs.rmSync(manifestDir, { recursive: true, force: true });
}

//make the manifest directory
fs.mkdirSync(manifestDir);

// Set to track unique items by name (or any other unique property like 'file' if preferred)
const uniqueItems = new Set();
const uniqueUsage = new Set();
const uniqueSources = new Set();

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
            
            // 1. Replace bracket values
            text = text.replace(/@.*\[.*\]\{(.*)\}/g, "$1");

            // 2. Replace @Check values
            text = text.replace(/@Check\[(\w+).*dc:(\d+).*\]/g, "DC $2 $1");
            text = text.replace(/@Check\[(\w+).*?against:class-spell]/g, "$1");
            text = text.replace(/@Check\[(\w+)\|?.+?\]/g, "$1");

            // 3. Replace Dice rolls
            text = text.replace(/\[\[.*\]\]\{(.*)\}/g,"$1");
            text = text.replace(/\[\[\/br 1d20\+\d\d]]{(.*)\}/g, "$1");
            text = text.replace(/\[\[\/r 1d20\+(\d+)\]\]/g, "+$1");
            text = text.replace(/\[\[\/r(?:oll)? (\d+d\d+)\]\]/g,"$1")
            text = text.replace(/\[\[.*(\d+?d\d+?) \#.*\]\]/g, "$1")

            // counteract modifiers 
            text = text.replace(/counteract modifier is (\+\d+) \[\[.*\]\],/g,"counteract modifier is $1,")

            // 2. Replace template values 
            text = text.replace(/@Template\[(?:type\:)?(\w+)\|distance:(\d+)\]/g, "$2 foot $1");

            // 3. Remove Item Effects
            text = text.replace(/@UUID\[Compendium\.pf2e\.equipment-effects\.Item\.Effect: .*?]/g, "");

            // 4. Replace Item and Actor
            text = text.replace(/@UUID\[Compendium.pf2e..*?\..*?\.(.*?)\]/g, "$1");

            // 5. Replace "options" in damage 
            text = text.replace(/(@Damage\[.*?)(\|.*?)(\])/g, "$1$3");

            // 6. Replace "Actor"
            text = text.replace()

            // 4.  Damage
            // 4a. Replace anything with @Damage[...]{...} with the ... in the brackets
            text = text.replace(/@Damage.*?\{(.*?)\}/g, "$1");

            // 4b. Replace Healing with Dice
            text = text.replace(/@Damage\[\(?(\d*d\d*\+?\d*)\)?\[(?:vitality,)?healing]]/g, "$1");

            // 4c. Replace single damage 
            text = text.replace(/@Damage\[\(?(\d*d\d*\+?\d*)\)?\[(\w+)]]/g, "$1 $2");

            // 4d. Replace four types of damage
            text = text.replace(/@Damage\[(\d+d\d+)\[(\w+)],(\d+d\d+)\[(\w+)],(\d+d\d+)\[(\w+)],(\d+d\d+)\[(\w+)]]/g, "$1 $2, $3 $4, $5 $6, and $7 $8");

            // 4e. Replace three types of damage
            text = text.replace(/@Damage\[(\d+d\d+)\[(\w+)],(\d+d\d+)\[(\w+)],(\d+d\d+)\[(\w+)]]/g, "$1 $2, $3 $4, and $5 $6");

            //4f. Replace two types of damage 
            text = text.replace(/@Damage\[(\d+d\d+)\[(\w+)],(\d+d\d+)\[(\w+)]]/g, "$1 $2 and $3 $4")

            // 4g. Replace persistent damage types 
            text = text.replace(/@Damage\[\(?(\d?d?\d+?)\[?(\w+),?(\w+)?]]/g, "$1 $2 $3");

            // 4h. Splash Damage
            text = text.replace(/@Damage\[\((\d+)\[splash\]\)\[(\w+)\]\]/g, "$1 $2");

            // 4i. base damage 
            text = text.replace(/@Damage\[(\d+d\d+)\]/g, "$1");

            // 4j. Spider Gun 
            text = text.replace(/@Damage\[\((\d+d\d)+\+@item\.system\.damage\.dice\)\[\w+,\w+\]\]/g, "$1 + the number of weapon damage dice") 

            // 4z. Replace double spaces caused by 4g
            text = text.replace("  ", " ");

            // 11. Fix the "Usage"
            let usage = item.system.usage?.value || '';
            usage = usage.replace(/([a-z]+)(?:-?([a-z]+))?(?:-?([a-z]+))?(?:-?([a-z]+))?/g, (match, p1, p2, p3, p4) => {
                return [p1, p2, p3, p4]
                    .filter(Boolean) // Remove any undefined parts
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
                    .join(' '); // Join with a space
            });

            if (usage) {

                usage = usage.replace("worncrown", "worncirclet");
                usage = usage.replace("wornring", "worn");
                // First regex handles "worn" only
                usage = usage.replace(/^worn$/i, "Worn");

                usage = usage.replace("-", " ");

                // Second regex to handle cases like "worncrown" -> "Worn Crown" (when "worn" is concatenated)
                usage = usage.replace(/worn([a-z]+)/gi, (match, p1) => {
                    return `Worn ${p1.charAt(0).toUpperCase() + p1.slice(1)}`;
                });

                // Third regex to handle hyphenated cases like "worn-beneath-armor" -> "Worn Beneath Armor"
                usage = usage.replace(/worn-([a-z]+)(?:-([a-z]+))?(?:-([a-z]+))?/gi, (match, p1, p2, p3) => {
                    return [
                        "Worn", // Capitalize "Worn"
                        p1 ? p1.charAt(0).toUpperCase() + p1.slice(1) : '',
                        p2 ? p2.charAt(0).toUpperCase() + p2.slice(1) : '',
                        p3 ? p3.charAt(0).toUpperCase() + p3.slice(1) : ''
                    ].filter(Boolean).join(' ');
                });

                usage = usage.replace("-", " ");

                if (usage === "Etched Onto Weapon Wo Holy Rune") {
                    usage = "Etched Onto Weapon";
                }

                if (!uniqueUsage.has(usage) && item.system.publication.remaster === true) {
                    uniqueUsage.add(usage);
                }
            }

            if (item.system.publication.title) {
                if (!uniqueSources.has(item.system.publication.title)) {
                    uniqueSources.add(item.system.publication.title);
                }
            }

            // Extract words following "Worn" if "usage" starts with "Worn", otherwise set to null
            const worn = usage.startsWith("Worn")
                ? usage === "Worn"
                    ? "Worn" // If "usage" is just "Worn", set "worn" to "Worn"
                    : usage.replace(/^Worn\s+/, "") // Remove "Worn " from the start to get the remaining words
                : null; // Set to null if "usage" doesn’t start with "Worn"

            // Construct the item data for the manifest with updated file name
            const itemEntry = {
                level: item.system.level?.value || 0,
                name: item.name,
                price: item.system.price.value,
                description: text || '',
                rarity: item.system.traits?.rarity || '',
                traits: item.system.traits?.value || [],
                usage: usage || '',
                worn: worn,
                publication: item.system.publication.title || '',
            };

            // if (item.system.publication.license === "ORC") {
            // if (item.system.publication.remaster) {
            if (true) {
                itemsWithDetails.push(itemEntry);
            }
        }


        // When all files are processed, split into chunks and save
        if (index === jsonFiles.length - 1) {
            // Split items into chunks of 500
            const chunkSize = 500;
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



    const usagesPath = path.join(miscJsonDir, 'usages.json');
    try {
        fs.writeFileSync(usagesPath, JSON.stringify([...uniqueUsage], null, 2));
        console.log('Unique usages saved successfully:', usagesPath);
    } catch (error) {
        console.error('Error writing unique usages file:', error);
    }

    const sourcesPath = path.join(miscJsonDir, 'sources.json');
    try {
        fs.writeFileSync(sourcesPath, JSON.stringify([...uniqueSources], null, 2));
        console.log('Unique Sources saved successfully:', sourcesPath);
    } catch (error) {
        console.error('Error writing unique sources file:', error);
    }

});
