import React from 'react';

interface InformationModalProps {
    onClose: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({ onClose }) => {
    return (
        <div className="save-modal">
            <div className="save-modal-content">
                <h2>This site was created by phroureo</h2>
                <p>You can view the repo <a href="https://github.com/phroureo/pf2e-tools">here</a>, and submit issues if you find them.</p>
                <p>You can also reach out to phroureo directly at <a href="mailto:me@phroureo.com">me@phroureo.com</a>, on Discord at phroureo, or on reddit at /u/phroureo</p>
                <button className="confirm-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default InformationModal;
