import React, { useEffect } from 'react';

interface CharacterLevelProps {
    level: number;
    onLevelChange: (level: number) => void;
}

const CharacterLevel: React.FC<CharacterLevelProps> = ({ level, onLevelChange }) => {
    const handleIncrement = () => {
        const newValue = level + 1 > 20 ? 20 : level + 1;
        onLevelChange(newValue);
    };

    const handleDecrement = () => {
        const newValue = level - 1 < 1 ? 1 : level - 1;
        onLevelChange(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = parseInt(e.target.value, 10);

        // Validate and adjust the value immediately
        if (isNaN(newValue) || newValue < 1) {
            newValue = 1;
        } else if (newValue > 20) {
            newValue = 20;
        }

        onLevelChange(newValue);
    };

    useEffect(() => {
        // Ensures the input value stays within range
        if (level > 20) {
            onLevelChange(20);
        } else if (level < 1) {
            onLevelChange(1);
        }
    }, [level, onLevelChange]);

    return (
        <div style={{ padding: 20 }}>
            <div className="input-container">
            <label>Character Level: </label>
                <button type="button" className="button" onClick={handleDecrement}>-</button>
                <input
                    type="number"
                    min="1"
                    max="20"
                    value={level}
                    onChange={handleInputChange}
                    className="custom-input"
                />
                <button type="button" className="button" onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};

export default CharacterLevel;
