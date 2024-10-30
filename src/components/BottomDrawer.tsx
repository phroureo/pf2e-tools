import React from 'react';
import Toggle from './Toggle';

interface SettingsDrawerProps {
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    drawerTitle: string;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
    isOpen,
    onToggle,
    children,
    drawerTitle = ""
}) => {
    return (
        <>
            {isOpen && <div className="dim-overlay" onClick={onToggle}></div>}
            <div className={`drawer ${isOpen ? 'open' : ''}`}>
                {/* Drawer Toggle Handle */}
                <div className={`drawer-handle ${isOpen ? 'open' : ''}`} onClick={onToggle}>
                    <h4>{drawerTitle}</h4>
                    <img
                        src="/misc/up-arrow.svg"
                        alt="Toggle Icon"
                        className={`toggle-icon ${isOpen ? 'rotate' : ''}`}
                    />
                </div>


                {/* Sliding Drawer Content */}
                <div className='drawer-content'>
                    {children}
                </div>
            </div>
        </>
    );
};

export default SettingsDrawer;
