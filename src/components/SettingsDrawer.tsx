import React, { useEffect, useRef, useState } from 'react';

interface SettingsDrawerProps {
    isOpen: boolean;
    onToggle: () => void;
    onHeightChange: (height: number) => void;
    children: React.ReactNode;
    drawerTitle: string;
    isRandomButtonVisible: boolean;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
    isOpen,
    onToggle,
    onHeightChange,
    children,
    drawerTitle = "",
    isRandomButtonVisible,
}) => {
    
const drawerBodyRef = useRef<HTMLDivElement | null>(null);
const [drawerBodyHeight, setDrawerBodyHeight] = useState(0);
  useEffect(() => {
    if (drawerBodyRef.current) {
      const height = drawerBodyRef.current.offsetHeight;
      setDrawerBodyHeight(height); // Set local state for use within Drawer
      onHeightChange(height); // Pass height to parent
    }
  }, [drawerBodyRef.current?.offsetHeight, onHeightChange]);

    return (
        <>
            <div className={`drawer ${isOpen ? "open" : ""}`} style={{ transform: `translateY(${(isOpen ? 0 : drawerBodyHeight) - (isRandomButtonVisible ? 0 : drawerBodyHeight)}px)`}}>
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
                <div className='drawer-content' ref={drawerBodyRef}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default SettingsDrawer;
