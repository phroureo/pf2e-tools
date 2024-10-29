import React from 'react';

interface ToggleProps {
  label: string;
  checked: boolean; // Add checked prop
  onToggle: (state: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onToggle }) => {
  const handleClick = () => {
    onToggle(!checked); // Toggle the checked state and pass the new value up
  };

  return (
    <div className="toggle-container" onClick={handleClick}>
      <div className={`toggle-slider ${checked ? 'active' : ''}`} />
      <span>{label}</span>
    </div>
  );
};

export default Toggle;
