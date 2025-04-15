import React from 'react';
import { Type, Image, Square, Columns2, List } from 'lucide-react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ id, icon, label }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${id}-draggable`,
    data: {
      type: id,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="flex items-center gap-2 p-3 border rounded-lg cursor-move hover:bg-gray-50"
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Elements</h2>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Basic Elements</h3>
        <DraggableItem id="heading" icon={<Type size={20} />} label="Heading" />
        <DraggableItem id="paragraph" icon={<Type size={20} />} label="Paragraph" />
        <DraggableItem id="image" icon={<Image size={20} />} label="Image" />
        <DraggableItem id="button" icon={<Square size={20} />} label="Button" />
        
        <h3 className="text-sm font-medium text-gray-500 mt-6 mb-2">Layout Elements</h3>
        <DraggableItem id="container" icon={<Square size={20} />} label="Container" />
        <DraggableItem id="two-columns" icon={<Columns2 size={20} />} label="Two Columns" />
        <DraggableItem id="list" icon={<List size={20} />} label="List" />
      </div>
    </div>
  );
};