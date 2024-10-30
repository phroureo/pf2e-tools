import React from 'react';

interface ConfirmationModalProps {
    message: string;
    onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onClose }) => {
    return (
        <div className="save-modal">
            <div className="save-modal-content">
                <h3>{message}</h3>
                <button className="confirm-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
