import React, { FC } from 'react';

interface DraggableProps {
  id: string;
  limit: number;
  children: React.ReactNode;
}

const Draggable: FC<DraggableProps> = ({ id, limit, children }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ id, limit }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        border: '1px solid black',
        padding: '10px',
        cursor: 'grab',
        backgroundColor: '#fff',
      }}
    >
      {children}
    </div>
  );
};

export default Draggable;
