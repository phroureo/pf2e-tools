import React, { useEffect, useRef, useState } from 'react';

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
    drawerTitle = "",
}) => {
    
const drawerBodyRef = useRef<HTMLDivElement | null>(null);
const [drawerBodyHeight, setDrawerBodyHeight] = useState(0);
useEffect(() => {
    const updateDrawerBodyHeight = () => {
      if (drawerBodyRef.current) {
        const height = drawerBodyRef.current.offsetHeight;
        setDrawerBodyHeight(height);
      }
    };
  
    // Initial calculation on mount
    updateDrawerBodyHeight();
  
    // Listen for window resize events
    window.addEventListener('resize', updateDrawerBodyHeight);
  
    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', updateDrawerBodyHeight);
    };
  }, [drawerBodyRef]);

    return (
        <>
            <div className={`drawer ${isOpen ? "open" : ""}`} style={{ transform: `translateY(${(isOpen ? 0 : drawerBodyHeight)}px)`}}>
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
