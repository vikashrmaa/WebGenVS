export interface Element {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'button' | 'container' | 'two-columns' | 'list';
  content?: string;
  children?: Element[];
  properties?: {
    [key: string]: any;
    fontSize?: string;
    color?: string;
    backgroundColor?: string;
    padding?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface DragItem {
  id: string;
  type: string;
}

export interface HistoryState {
  past: Element[][];
  present: Element[];
  future: Element[][];
}