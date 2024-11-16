import React, { ReactNode, useState } from 'react';

interface FlyoutProps {
    children: ReactNode;
    rightLeft: "right" | "left";
}

const Flyout: React.FC<FlyoutProps> = ({ children, rightLeft }) => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
    let timeoutId: NodeJS.Timeout;

    const handleIconClick = () => {
        setIsFlyoutOpen(!isFlyoutOpen);
    };

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId); // Prevent closure if hovered again
    };

    const handleMouseLeave = () => {
        // Set a timeout to close the flyout after 0.5 seconds
        timeoutId = setTimeout(() => {
            setIsFlyoutOpen(false);
        }, 500);
    };

    return (
        <div
            className="flyout-container"
            data-position={rightLeft}>
            <div
                className="flyout"
                data-position={rightLeft}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <button
                    onClick={handleIconClick}
                    className={`flyout-icon-button ${isFlyoutOpen ? 'active' : ''}`}
                    data-position={rightLeft}
                >
                    <img src="misc/burger-menu.svg" alt="Menu" className="flyout-icon" />
                </button>
                <div
                    className={`flyout-menu ${isFlyoutOpen ? 'open' : 'closed'}`}
                    data-position={rightLeft}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Flyout;
