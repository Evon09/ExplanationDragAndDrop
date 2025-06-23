import { Layout } from 'react-grid-layout';

export interface PaletteItemType {
  id: string; // Unique ID for the type of component in the palette
  name: string; // Display name
  defaultWidth: number; // Default width in grid units
  defaultHeight: number; // Default height in grid units
  minW?: number;
  minH?: number;
}

// Extends react-grid-layout's Layout type with our custom properties
export interface GridLayoutItem extends Layout {
  i: string; // Explicitly define 'i' to satisfy TypeScript compiler if inheritance isn't picked up.
  x: number; // Explicitly define x
  y: number; // Explicitly define y
  w: number; // Explicitly define w
  h: number; // Explicitly define h
  minW?: number; // Explicitly add minW from Layout
  minH?: number; // Explicitly add minH from Layout
  paletteItemId: string; // Reference to the type of component from palette
}

// This interface will pass the necessary information from RGL's onDrop to the App
export interface ExtendedDroppedItemDetails {
  newLayoutForCurrentBreakpoint: Layout[]; // The layout array for the current breakpoint, containing the dropped item
  droppedLayoutItem: Layout; // The specific layout item that was dropped (often with i: "__dropping-elem__")
}


// This type might be deprecated or repurposed if modal is no longer primary flow
export interface SizeModalConfigType {
  paletteItem: PaletteItemType;
  dropX: number; // X coordinate from the drop event
  dropY: number; // Y coordinate from the drop event
}