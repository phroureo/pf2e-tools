import React from 'react';

interface CharacterLevelProps {
    level: number;
    onLevelChange: (level: number) => void;
}

const CharacterLevel: React.FC<CharacterLevelProps> = ({ level, onLevelChange }) => (
    <div>
        <label>Character Level: </label>
        <input
            type="number"
            min="1"
            value={level}
            onChange={(e) => onLevelChange(parseInt(e.target.value, 10))}
        />
    </div>
);

export default CharacterLevel;
