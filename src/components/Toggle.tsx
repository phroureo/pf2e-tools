// Toggle.tsx
import React, { useState } from 'react';

interface ToggleProps {
  label: string;
  onToggle: (state: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, onToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
    onToggle(!isOn);
  };

  return (
    <div className="toggle-container" onClick={handleClick}>
      <div className={`toggle-slider ${isOn ? 'active' : ''}`} />
      <span>{label}</span>
    </div>
  );
};

export default Toggle;
