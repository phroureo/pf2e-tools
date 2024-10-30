// utils/jsonHandler.ts

export const uploadJSON = (event: React.ChangeEvent<HTMLInputElement>, onLoadData: (data: any) => void) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result as string);
                onLoadData(data);  // Pass parsed data to the handler function
            } catch (error) {
                console.error('Invalid JSON file format', error);
            }
        };
        reader.readAsText(file);
    }
};
