import React, { useState, useEffect } from 'react';
import Toggle from '../Toggle';

interface SaveModalProps {
    onSave: (name: string, overwrite?: boolean) => void;
    onClose: () => void;
    isEdit?: boolean;
    savedName?: string;
}

const SaveModal: React.FC<SaveModalProps> = ({ onSave, onClose, isEdit, savedName }) => {
    const [name, setName] = useState(savedName || ''); // Initialize with savedName if available
    const [isSaveAs, setIsSaveAs] = useState(false);   // Toggle state for "Save As"

    // Update name if savedName changes (e.g., if a different save is loaded)
    useEffect(() => {
        if (savedName) {
            setName(savedName);
        }
    }, [savedName]);

    const handleSave = () => {
        // If "Save As" is off, overwrite the current save
        onSave(name, !isSaveAs);
        onClose();
    };

    return (
        <div className="save-modal">
            <h2>{isEdit ? 'Edit Save' : 'Save Current List'}</h2>
            
            {/* Toggle for Save As */}
            {isEdit && (
                <Toggle
                    label="Save As"
                    checked={isSaveAs}
                    onToggle={setIsSaveAs}
                />
            )}
            
            {/* Name Input Field */}
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name your list" 
                disabled={!isSaveAs && isEdit} // Disable if editing existing save
            />

            <div className="save-modal-footer">
                <button className="modal-button" onClick={handleSave}>
                    {isSaveAs ? 'Save As' : 'Save'}
                </button>
                <button className="modal-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SaveModal;
