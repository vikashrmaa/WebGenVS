import { create } from 'zustand';
import { Element, HistoryState } from './types';

const MAX_HISTORY_LENGTH = 50;

interface BuilderStore {
  elements: Element[];
  selectedElement: Element | null;
  history: HistoryState;
  addElement: (element: Element) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  deleteElement: (id: string) => void;
  setSelectedElement: (element: Element | null) => void;
  reorderElements: (elements: Element[]) => void;
  undo: () => void;
  redo: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}

const initialState = {
  elements: [],
  selectedElement: null,
  history: {
    past: [],
    present: [],
    future: [],
  },
};

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  ...initialState,

  addElement: (element) => {
    set((state) => {
      const newElements = [...state.elements, element];
      const newHistory = pushHistory(state.history, newElements);
      return { 
        elements: newElements,
        history: newHistory,
      };
    });
    get().saveToLocalStorage();
  },

  updateElement: (id, updates) => {
    set((state) => {
      const newElements = state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      );
      const newHistory = pushHistory(state.history, newElements);
      return { 
        elements: newElements,
        history: newHistory,
      };
    });
    get().saveToLocalStorage();
  },

  deleteElement: (id) => {
    set((state) => {
      const newElements = state.elements.filter((el) => el.id !== id);
      const newHistory = pushHistory(state.history, newElements);
      return { 
        elements: newElements,
        selectedElement: null,
        history: newHistory,
      };
    });
    get().saveToLocalStorage();
  },

  setSelectedElement: (element) => set({ selectedElement: element }),

  reorderElements: (elements) => {
    set((state) => {
      const newHistory = pushHistory(state.history, elements);
      return { 
        elements,
        history: newHistory,
      };
    });
    get().saveToLocalStorage();
  },

  undo: () => {
    set((state) => {
      if (state.history.past.length === 0) return state;
      
      const previous = state.history.past[state.history.past.length - 1];
      const newPast = state.history.past.slice(0, -1);
      
      return {
        elements: previous,
        history: {
          past: newPast,
          present: previous,
          future: [state.history.present, ...state.history.future],
        },
      };
    });
    get().saveToLocalStorage();
  },

  redo: () => {
    set((state) => {
      if (state.history.future.length === 0) return state;
      
      const next = state.history.future[0];
      const newFuture = state.history.future.slice(1);
      
      return {
        elements: next,
        history: {
          past: [...state.history.past, state.history.present],
          present: next,
          future: newFuture,
        },
      };
    });
    get().saveToLocalStorage();
  },

  saveToLocalStorage: () => {
    const { elements } = get();
    localStorage.setItem('website-builder-elements', JSON.stringify(elements));
  },

  loadFromLocalStorage: () => {
    const savedElements = localStorage.getItem('website-builder-elements');
    if (savedElements) {
      set({ elements: JSON.parse(savedElements) });
    }
  },
}));

function pushHistory(history: HistoryState, elements: Element[]): HistoryState {
  return {
    past: [...history.past, history.present].slice(-MAX_HISTORY_LENGTH),
    present: elements,
    future: [],
  };
}