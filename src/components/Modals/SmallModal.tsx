import React, { ReactNode } from 'react';

interface RefreshModalProps {
    children: ReactNode;
    onConfirm?: () => void;
    onClose: () => void;
    isOpen: boolean;
}

const RefreshModal: React.FC<RefreshModalProps> = ({ children, onConfirm, onClose, isOpen }) => {
    if (!isOpen) return null;
    return (
        <div className="save-modal">
            <div className="save-modal-content">
                {children}
                <div className="modal-buttons">
                    {onConfirm && (
                        <button className="confirm-button" onClick={onConfirm}>
                        Confirm
                    </button>
                    )}
                    <button className="cancel-button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RefreshModal;
