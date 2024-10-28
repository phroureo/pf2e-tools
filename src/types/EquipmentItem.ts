export interface EquipmentItem {
    id: string;
    name: string;
    system?: {
        level: {
            value: number;
        };
        price?: {
            value?: {
                pp?: number;
                gp?: number;
                sp?: number;
                cp?: number;
            };
        };
        traits?: {
            rarity: string;
            value: string[];
        };
        description?: {
            value: string;
        };
    };
}
