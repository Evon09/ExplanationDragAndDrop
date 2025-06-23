
import React from 'react';
import { PaletteItem } from './PaletteItem';
import { PaletteItemType } from '../types';

interface DrawerProps {
  paletteItems: PaletteItemType[];
  onDragStartItem: (item: PaletteItemType) => void;
  onDragEndItem: () => void;
  isDrawerOpen: boolean;
  onToggleDrawer: () => void;
}

const IconChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const IconChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

export const Drawer = ({ paletteItems, onDragStartItem, onDragEndItem, isDrawerOpen, onToggleDrawer }: DrawerProps): React.ReactNode => {
  return (
    <aside 
      className={`h-full bg-slate-800 text-white shadow-lg flex-shrink-0 transition-all duration-300 ease-in-out flex flex-col relative
                  ${isDrawerOpen ? 'w-64 p-5' : 'w-20 p-3 items-center'}`}
      aria-expanded={isDrawerOpen}
    >
      <button 
        onClick={onToggleDrawer} 
        className={`absolute top-3 text-slate-400 hover:text-white transition-colors p-1 rounded-md
                    ${isDrawerOpen ? 'right-3' : 'right-1/2 translate-x-1/2'}`}
        aria-label={isDrawerOpen ? "Collapse drawer" : "Expand drawer"}
        title={isDrawerOpen ? "Collapse drawer" : "Expand drawer"}
      >
        {isDrawerOpen ? <IconChevronLeft /> : <IconChevronRight />}
      </button>

      <h2 
        className={`text-xl font-semibold border-b border-slate-700 pb-3 transition-all duration-300 ease-in-out
                    ${isDrawerOpen ? 'mt-10 mb-6 opacity-100' : 'opacity-0 h-0 w-0 overflow-hidden mt-0 mb-0'}`}
      >
        Components
      </h2>
      
      <div 
        className={`space-y-3 overflow-y-auto flex-grow w-full
                    ${isDrawerOpen ? '' : 'mt-12 flex flex-col items-center'}`}
      >
        {paletteItems.map(item => (
          <PaletteItem
            key={item.id}
            itemDetails={item}
            onDragStart={onDragStartItem}
            onDragEnd={onDragEndItem}
            isDrawerOpen={isDrawerOpen}
          />
        ))}
      </div>
    </aside>
  );
};
