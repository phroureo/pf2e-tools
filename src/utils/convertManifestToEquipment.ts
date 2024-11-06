import { EquipmentItem } from "../types/EquipmentItem";
import { ManifestItem } from "../types/ManifestItem";

export function convertToEquipmentItem(manifestItem: ManifestItem, zone: string): EquipmentItem {
    return {
        ...manifestItem,
        zone // Adds the 'zone' property to match the EquipmentItem interface
    };
}