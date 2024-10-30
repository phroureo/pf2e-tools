import React from 'react';
import { ManifestItem } from '../../types/ManifestItem';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    selectedItem: ManifestItem | null;
    handleAddItem: () => void;
    showAddToList: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, selectedItem, handleAddItem, showAddToList }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                {children}
                <div className="modal-footer">
                    <button onClick={onClose} className="close-button">Close</button>
                    {showAddToList && selectedItem && (
                        <button onClick={handleAddItem} className="add-to-list-button">
                            Add to List
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
