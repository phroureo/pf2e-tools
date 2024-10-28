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
    description?: string,
    rarity?: string,
    traits?: string[]
}