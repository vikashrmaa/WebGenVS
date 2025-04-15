import React from 'react';
import { useBuilderStore } from '../store';

export const PropertyEditor: React.FC = () => {
  const selectedElement = useBuilderStore((state) => state.selectedElement);
  const updateElement = useBuilderStore((state) => state.updateElement);

  if (!selectedElement) {
    return (
      <div className="w-64 bg-white border-l p-4">
        <p className="text-gray-400 text-center">Select an element to edit its properties</p>
      </div>
    );
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateElement(selectedElement.id, { content: e.target.value });
  };

  const handlePropertyChange = (property: string, value: string) => {
    updateElement(selectedElement.id, {
      properties: { ...selectedElement.properties, [property]: value },
    });
  };

  return (
    <div className="w-64 bg-white border-l p-4">
      <h2 className="text-lg font-semibold mb-4">Properties</h2>
      <div className="space-y-4">
        {selectedElement.type !== 'image' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <input
              type="text"
              value={selectedElement.content || ''}
              onChange={handleContentChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        )}

        {selectedElement.type === 'image' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={selectedElement.properties?.src || ''}
                onChange={(e) => handlePropertyChange('src', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alt Text
              </label>
              <input
                type="text"
                value={selectedElement.properties?.alt || ''}
                onChange={(e) => handlePropertyChange('alt', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <select
            value={selectedElement.properties?.fontSize || ''}
            onChange={(e) => handlePropertyChange('fontSize', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Default</option>
            <option value="text-sm">Small</option>
            <option value="text-base">Medium</option>
            <option value="text-lg">Large</option>
            <option value="text-xl">Extra Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Color
          </label>
          <input
            type="color"
            value={selectedElement.properties?.color || '#000000'}
            onChange={(e) => handlePropertyChange('color', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <input
            type="color"
            value={selectedElement.properties?.backgroundColor || '#ffffff'}
            onChange={(e) => handlePropertyChange('backgroundColor', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Align
          </label>
          <select
            value={selectedElement.properties?.textAlign || 'left'}
            onChange={(e) => handlePropertyChange('textAlign', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Padding
          </label>
          <select
            value={selectedElement.properties?.padding || '0'}
            onChange={(e) => handlePropertyChange('padding', e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="0">None</option>
            <option value="0.5rem">Small</option>
            <option value="1rem">Medium</option>
            <option value="1.5rem">Large</option>
          </select>
        </div>
      </div>
    </div>
  );
};