import { ManifestItem } from "./ManifestItem";

export interface DropZoneData {
    id: string;
    items: ManifestItem[];
    maxSlots: number;
    limit: number;
  }