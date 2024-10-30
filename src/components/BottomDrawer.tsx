import React, { useEffect, useRef, useState } from 'react';

interface SettingsDrawerProps {
    isOpen: boolean;
    onToggle: () => void;
    onHeightChange: (height: number) => void;
    children: React.ReactNode;
    drawerTitle: string;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
    isOpen,
    onToggle,
    onHeightChange,
    children,
    drawerTitle = ""
}) => {
    
const drawerBodyRef = useRef<HTMLDivElement | null>(null);
const [drawerBodyHeight, setDrawerBodyHeight] = useState(0);
  useEffect(() => {
    if (drawerBodyRef.current) {
      const height = drawerBodyRef.current.offsetHeight;
      console.log(height);
      setDrawerBodyHeight(height); // Set local state for use within Drawer
      onHeightChange(height); // Pass height to parent
    }
  }, [drawerBodyRef.current?.offsetHeight, onHeightChange]);

    return (
        <>
            {isOpen && <div className="dim-overlay" onClick={onToggle}></div>}
            <div className={`drawer ${isOpen ? "open" : ""}`} style={{ transform: `translateY(${isOpen ? 0 : drawerBodyHeight}px)`}}>
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
