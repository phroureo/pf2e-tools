export interface ManifestItem {
    id: string,
    name: string,
    level: number,
    price?: {
        value?: {
            pp?: number;
            gp?: number;
            sp?: number;
            cp?: number;
        }
    },
    usage?: string,
    worn?: string,
    description?: string,
    rarity?: string,
    publication: string,
    traits?: string[]
}