export interface LevelData {
    level: number;
    currency: number;
    lumpSum: number;
    itemsByLevel: Record<number, number>
}