import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useBuilderStore } from '../store';
import { Element } from '../types';
import { Trash2 } from 'lucide-react';

interface ElementProps {
  element: Element;
}

const ElementComponent: React.FC<ElementProps> = ({ element }) => {
  const setSelectedElement = useBuilderStore((state) => state.setSelectedElement);
  const deleteElement = useBuilderStore((state) => state.deleteElement);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElement(element);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteElement(element.id);
  };

  const commonStyles = {
    fontSize: element.properties?.fontSize || 'inherit',
    color: element.properties?.color || 'inherit',
    backgroundColor: element.properties?.backgroundColor || 'transparent',
    padding: element.properties?.padding || '0',
    textAlign: element.properties?.textAlign as any || 'left',
  };

  const wrapperClass = "group relative";

  const deleteButton = (
    <button
      onClick={handleDelete}
      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Trash2 size={16} />
    </button>
  );

  switch (element.type) {
    case 'heading':
      return (
        <div className={wrapperClass}>
          {deleteButton}
          <h2 
            className="text-2xl font-bold mb-4 cursor-pointer" 
            onClick={handleClick}
            style={commonStyles}
          >
            {element.content || 'Heading'}
          </h2>
        </div>
      );
    case 'paragraph':
      return (
        <div className={wrapperClass}>
          {deleteButton}
          <p 
            className="mb-4 cursor-pointer" 
            onClick={handleClick}
            style={commonStyles}
          >
            {element.content || 'Paragraph text'}
          </p>
        </div>
      );
    case 'image':
      return (
        <div className={wrapperClass}>
          {deleteButton}
          <img
            src={element.properties?.src || 'https://via.placeholder.com/400x300'}
            alt={element.properties?.alt || 'Placeholder'}
            className="max-w-full h-auto mb-4 cursor-pointer"
            onClick={handleClick}
            style={commonStyles}
          />
        </div>
      );
    case 'button':
      return (
        <div className={wrapperClass}>
          {deleteButton}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            onClick={handleClick}
            style={commonStyles}
          >
            {element.content || 'Button'}
          </button>
        </div>
      );
    default:
      return null;
  }
};

export const Canvas: React.FC = () => {
  const elements = useBuilderStore((state) => state.elements);
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div 
      ref={setNodeRef}
      className="flex-1 bg-white p-8 min-h-screen"
      onClick={() => useBuilderStore.getState().setSelectedElement(null)}
    >
      {elements.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400">
          Drag elements from the sidebar and drop them here
        </div>
      ) : (
        <div className="space-y-4">
          {elements.map((element) => (
            <ElementComponent key={element.id} element={element} />
          ))}
        </div>
      )}
    </div>
  );
};