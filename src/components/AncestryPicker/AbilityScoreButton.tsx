import React, { useState, MouseEvent } from "react";

interface AbilityScoreButtonProps {
  ability: string;
  value: number;
  setAbilityScore: (ability: string, value: number) => void;
}

const AbilityScoreButton: React.FC<AbilityScoreButtonProps> = ({
  ability,
  value,
  setAbilityScore,
}) => {
  const [color, setColor] = useState("#30336b"); // Default color

  const handleLeftClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newValue = value === 1 ? 0 : 1;
    setAbilityScore(ability, newValue);
    setColor(newValue === 1 ? "green" : "#30336b");
  };

  const handleRightClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newValue = value === -1 ? 0 : -1;
    setAbilityScore(ability, newValue);
    setColor(newValue === -1 ? "red" : "#30336b");
  };

  return (
    <button
      style={{
        backgroundColor: color,
        margin: "5px",
      }}
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
    >
      {ability.toUpperCase()}
    </button>
  );
};

export default AbilityScoreButton;
