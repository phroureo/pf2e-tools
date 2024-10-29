import React, { useEffect } from 'react';

interface CharacterLevelProps {
    level: number;
    onLevelChange: (level: number) => void;
    lumpSum: number;
    setLumpSum: (value: number) => void;
}

const CharacterLevel: React.FC<CharacterLevelProps> = ({ level, onLevelChange, lumpSum, setLumpSum }) => {
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

        if (isNaN(newValue) || newValue < 1) {
            newValue = 1;
        } else if (newValue > 20) {
            newValue = 20;
        }

        onLevelChange(newValue);
    };

    const handleLumpSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLumpSum = parseInt(e.target.value, 10);
        if (!isNaN(newLumpSum)) {
            setLumpSum(newLumpSum);
        }
    };

    useEffect(() => {
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
                <div className="level-input-wrapper">
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
                <label htmlFor="lumpSum" style={{ marginLeft: '10px' }}>Total Gold: </label>
                <input
                    type="number"
                    id="lumpSum"
                    value={lumpSum}
                    onChange={handleLumpSumChange}
                    className="custom-input"
                />
            </div>
        </div>
    );
};

export default CharacterLevel;
