// src/utils/formatPrice.ts

interface PriceValue {
    cp?: number;
    sp?: number;
    gp?: number;
    pp?: number;
}

export const simplifyPrice = (price: PriceValue): PriceValue => {
    let { cp = 0, sp = 0, gp = 0, pp = 0 } = price;

    // Convert pp to gp, then do the other conversions
    gp += pp * 10; // Convert platinum to gold
    
    // Convert cp to sp, and sp to gp
    sp += Math.floor(cp / 10);
    cp = cp % 10; // Remainder in cp

    gp += Math.floor(sp / 10);
    sp = sp % 10; // Remainder in sp

    return { cp, sp, gp };
};

export const formatPrice = (price?: { pp?: number; gp?: number; sp?: number; cp?: number }): string => {
    if (!price) {
        return "No price available"; // Or any default string if price is missing
    }

    const parts = [];
    if (price.pp) parts.push(`${price.pp} pp`);
    if (price.gp) parts.push(`${price.gp} gp`);
    if (price.sp) parts.push(`${price.sp} sp`);
    if (price.cp) parts.push(`${price.cp} cp`);
    return parts.join(', ');
};

export const calculateTotalValue = (price: PriceValue): number => {
    const cp = price.cp ?? 0;
    const sp = price.sp ?? 0;
    const gp = price.gp ?? 0;
    const pp = price.pp ?? 0;

    return cp + (sp * 10) + (gp * 100) + (pp * 1000);
};