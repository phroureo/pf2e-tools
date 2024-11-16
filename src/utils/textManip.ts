export function toProperCase(input: string | undefined | null): string {
    if (!input) {
        return ''; // Return an empty string if input is undefined or null
    }

    return input
        .split(' ')
        .map(word => {
            if (word.length === 2) {
                return word.toUpperCase();
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        })
        .join(' ');
}
