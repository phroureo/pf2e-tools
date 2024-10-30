import React, { useState } from 'react';

interface FlyoutProps {
    saveData: () => void;
    loadData: () => void;
    onDownload: () => void;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Flyout: React.FC<FlyoutProps> = ({ saveData, loadData, onDownload, onUpload }) => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleIconClick = () => {
        setIsFlyoutOpen(!isFlyoutOpen);
    };

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId); // Prevent closure if hovered again
    };

    const handleMouseLeave = () => {
        // Set a timeout to close the flyout after 0.5 seconds
        timeoutId = setTimeout(() => {
            setIsFlyoutOpen(false);
        }, 500);
    };

    return (
        <div className="flyout" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button
                onClick={handleIconClick}
                className={`flyout-icon-button ${isFlyoutOpen ? 'active' : ''}`}
            >
                <img src="misc/burger-menu.svg" alt="Menu" className="flyout-icon" />
            </button>
            <div className={`flyout-menu ${isFlyoutOpen ? 'open' : 'closed'}`}>
                <button onClick={saveData}>Save</button>
                <button onClick={loadData}>Load</button>
                <button onClick={onDownload}>Export</button>
                <label className="upload-label">
                    Import
                    <input
                        type="file"
                        onChange={onUpload}
                        className="upload-input"
                        accept=".json"
                    />
                </label>
            </div>
        </div>
    );
};

export default Flyout;
