import React, { useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertyEditor } from './components/PropertyEditor';
import { useBuilderStore } from './store';
import { Undo2, Redo2 } from 'lucide-react';

function App() {
  const addElement = useBuilderStore((state) => state.addElement);
  const loadFromLocalStorage = useBuilderStore((state) => state.loadFromLocalStorage);
  const undo = useBuilderStore((state) => state.undo);
  const redo = useBuilderStore((state) => state.redo);

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && over.id === 'canvas') {
      const type = active.data.current?.type;
      if (type) {
        addElement({
          id: `${type}-${Date.now()}`,
          type: type,
          content: '',
          properties: {},
        });
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="bg-white border-b p-2 flex justify-end space-x-2">
            <button
              onClick={() => undo()}
              className="p-2 hover:bg-gray-100 rounded"
              title="Undo"
            >
              <Undo2 size={20} />
            </button>
            <button
              onClick={() => redo()}
              className="p-2 hover:bg-gray-100 rounded"
              title="Redo"
            >
              <Redo2 size={20} />
            </button>
          </div>
          <Canvas />
        </div>
        <PropertyEditor />
      </div>
    </DndContext>
  );
}

export default App;