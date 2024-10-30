export const downloadJSON = (data: any, filename = 'item-list.json') => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
};

export const uploadJSON = (event: React.ChangeEvent<HTMLInputElement>, onLoadData: (data: any) => void) => {
    const file = event.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const data = JSON.parse(reader.result as string);
                onLoadData(data);
            } catch (error) {
                console.error('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    }
};
