
import { PaletteItemType } from './types';

export const PALETTE_ITEMS: PaletteItemType[] = [

  // Original New Components
  { id: 'explanationText', name: 'Explanation', defaultWidth: 4, defaultHeight: 2, minW: 2, minH: 1 },
  { id: 'originalImage', name: 'Original Image', defaultWidth: 4, defaultHeight: 3, minW: 2, minH: 2 },
  { id: 'explanationImage', name: 'Explanation Image', defaultWidth: 4, defaultHeight: 3, minW: 2, minH: 2 },
  


  // New Explanation Selector Variations
  { id: 'explanationSelector', name: 'Expl: Buttons', defaultWidth: 3, defaultHeight: 2, minW: 2, minH: 2 },
  { id: 'explanationSelectorDots', name: 'Expl: Dots', defaultWidth: 3, defaultHeight: 2, minW: 2, minH: 2 },
  { id: 'explanationSelectorMinimal', name: 'Expl: Minimal', defaultWidth: 2, defaultHeight: 1, minW: 2, minH: 1 },

  // New Stakeholder Selector Variations
  { id: 'stakeholderSelector', name: 'Stake: Buttons', defaultWidth: 4, defaultHeight: 2, minW: 3, minH: 1 },
  { id: 'stakeholderSelectorDropdown', name: 'Stake: Dropdown', defaultWidth: 3, defaultHeight: 2, minW: 2, minH: 2 },
  { id: 'stakeholderSelectorRadio', name: 'Stake: Radio', defaultWidth: 2, defaultHeight: 3, minW: 2, minH: 3 },
  { id: 'stakeholderSelectorTabs', name: 'Stake: Tabs', defaultWidth: 4, defaultHeight: 2, minW: 3, minH: 1 },



  { id: 'text', name: 'Text Block', defaultWidth: 3, defaultHeight: 2, minW: 2, minH: 1 },
  { id: 'image', name: 'Image Placeholder', defaultWidth: 3, defaultHeight: 2, minW: 2, minH: 2 },
  { id: 'chart', name: 'Chart Placeholder', defaultWidth: 4, defaultHeight: 3, minW: 3, minH: 2 },
  { id: 'card', name: 'Info Card', defaultWidth: 3, defaultHeight: 2, minW: 2, minH: 2 },
  { id: 'header', name: 'Header Text', defaultWidth: 6, defaultHeight: 1, minW: 4, minH: 1 },
  { id: 'button', name: 'Button', defaultWidth: 2, defaultHeight: 1, minW: 1, minH: 1 },
];

export const GRID_COLS = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }; // Breakpoints for react-grid-layout
export const GRID_ROW_HEIGHT = 50; // Pixels
export const GRID_ITEM_MARGIN: [number, number] = [10, 10]; // [horizontal, vertical] in pixels
export const GRID_CONTAINER_PADDING: [number, number] = [10, 10]; // [horizontal, vertical] in pixels for grid container

// Special ID for the react-grid-layout dropping item placeholder
export const DROPPING_ITEM_ID = "__dropping-elem__";
