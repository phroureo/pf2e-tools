import React from 'react';

const TraitPill: React.FC<{ trait: string }> = ({ trait }) => {
    let backgroundColor = '#444';
    if (trait === 'uncommon') backgroundColor = '#c45500';
    else if (trait === 'rare') backgroundColor = '#0c1466';
    else if (trait === 'unique') backgroundColor = '#800080';

    return (
        <span className="trait-pill" style={{ backgroundColor }}>
            {trait}
        </span>
    );
};

export default TraitPill;
