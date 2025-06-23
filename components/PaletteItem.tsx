
import React from 'react';
import { PaletteItemType } from '../types';
import GridItemContent from './GridItemContent'; 

interface PaletteItemProps {
  itemDetails: PaletteItemType;
  onDragStart: (item: PaletteItemType) => void;
  onDragEnd: () => void;
  isDrawerOpen?: boolean; // Optional, defaults to true for backward compatibility if not passed
}

export const PaletteItem = ({ 
  itemDetails, 
  onDragStart, 
  onDragEnd, 
  isDrawerOpen = true 
}: PaletteItemProps): React.ReactNode => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', itemDetails.id);
    e.dataTransfer.effectAllowed = 'copy';
    onDragStart(itemDetails);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  return (
    <div
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-slate-700 rounded-md cursor-grab hover:bg-slate-600 active:bg-slate-500 active:cursor-grabbing transition-all duration-150 ease-in-out shadow
                  ${isDrawerOpen ? 'p-3' : 'p-2 w-full max-w-[60px]'}`} // Adjust padding and width for collapsed state
      title={`Drag to add ${itemDetails.name}`}
    >
      {isDrawerOpen && (
        <p className="text-sm font-medium mb-2 text-center truncate">{itemDetails.name}</p>
      )}
      <div 
        className={`w-full bg-slate-800/70 rounded border border-slate-600/50 flex items-center justify-center overflow-hidden
                    ${isDrawerOpen ? 'h-24' : 'h-12'}`} // Smaller miniature in collapsed state
        aria-hidden="true"
      >
        <GridItemContent
          itemId={`miniature-${itemDetails.id}`}
          paletteItemId={itemDetails.id}
          onRemoveItem={() => {}}
          isMiniature={true}
        />
      </div>
    </div>
  );
};
