import { EmitMetadata, ignoreFilter, showInTrait,  } from "./Decorators";


@EmitMetadata
export class Ancestry {
    name: string;
    hp: number;
    size: string;
    speed: number;

    @ignoreFilter
    @showInTrait
    boosts: string[]; // Restricts boosts to the defined ability scores
    
    @ignoreFilter
    @showInTrait
    flaw: string; // Restricts flaw to the defined ability scores
    vision: string;
    rarity: string;

    constructor(
        name: string = "",
        hp: number = 0,
        size: string = "",
        speed: number = 0,
        boosts: string[] = [],
        flaw: string = "",
        vision: string = "",
        rarity: string = ""
    ) {
        this.name = name;
        this.hp = hp;
        this.size = size;
        this.speed = speed;
        this.boosts = boosts;
        this.flaw = flaw;
        this.vision = vision;
        this.rarity = rarity;
    }

    // Example method to format boosts as a string
    getFormattedBoosts(): string {
        if (this.boosts.join(', ') === "free, free") {
            return "Two free ability boosts"
        }
        return this.boosts.join(', ');
    }

    // Example method to display ancestry details
    displayAncestryInfo(): string {
        return `
        Name: ${this.name}
        HP: ${this.hp}
        Size: ${this.size}
        Speed: ${this.speed}
        Boosts: ${this.getFormattedBoosts()}
        Flaw: ${this.flaw}
        Vision: ${this.vision}
        Rarity: ${this.rarity}
        `;
    }
}

