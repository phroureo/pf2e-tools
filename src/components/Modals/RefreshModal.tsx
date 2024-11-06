import React from 'react';

interface RefreshModalProps {
    onConfirm: () => void;
    onClose: () => void;
}

const RefreshModal: React.FC<RefreshModalProps> = ({ onConfirm, onClose }) => {
    return (
        <div className="save-modal">
            <div className="save-modal-content">
                <h3>Refresh Cached Data</h3>
                <p>Would you like to refresh your cached equipment data?
                If you think you are missing items/equipment to pick
                from, you can force the data to refresh.</p>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={onConfirm}>
                        Yes
                    </button>
                    <button className="cancel-button" onClick={onClose}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RefreshModal;
