// Header.tsx

import React from 'react';

interface HeaderProps {
    saveData: () => void;
    loadData: () => void;
    onDownload: () => void;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ saveData, loadData, onDownload, onUpload }) => (
    <header className='header'>
            <span className="header-item" onClick={saveData}>Save Current List</span>
            <span className="header-item" onClick={loadData}>Load Saved List</span>
            <span className="header-item" onClick={onDownload}>Download JSON</span>
        <input
            type="file"
            accept=".json"
            style={{ display: "none" }}
            onChange={onUpload}
            id="upload-json"
        />
        <label htmlFor="upload-json" className="upload-button">
            Upload JSON
        </label>
    </header>
);

export default Header;
