const LoadModal: React.FC<{ onLoad: (name: string) => void, onDelete: (name: string) => void, onClose: () => void }> = ({ onLoad, onDelete, onClose }) => {
    // Get saved lists from localStorage
    const savedLists = Object.keys(localStorage).map(key => ({
        key,  // Store the key to reference in delete
        ...JSON.parse(localStorage.getItem(key) || '{}')
    })).filter(item => item.Type === "saveData"); // Filter by Type;

    const handleDelete = (key: string) => {
        localStorage.removeItem(key);  // Remove the item from localStorage
        onDelete(key);                 // Trigger the onDelete callback
    };

    return (
        <div className="save-modal">
            <h2>Load Saved List</h2>
            <ul>
                {savedLists.map(({ key, name, characterLevel, lumpSum }, idx) => (
                    <li key={idx} className="list-item">
                        <span>{name} - Level: {characterLevel}, Lump Sum: {lumpSum}</span>
                        <div className="button-group">
                            <button onClick={() => onLoad(key)}>Load</button>
                            <button onClick={() => handleDelete(key)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default LoadModal;
