import React from 'react';
import { ManifestItem } from '../../types/ManifestItem';

interface ModalProps {
    isOpen: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;
