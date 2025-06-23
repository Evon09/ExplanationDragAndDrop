import React from 'react';
import { Responsive, WidthProvider, Layouts, Layout } from 'react-grid-layout';
import GridItemContent from './GridItemContent';
import { GridLayoutItem, ExtendedDroppedItemDetails } from '../types';
import { GRID_COLS, GRID_ROW_HEIGHT, GRID_ITEM_MARGIN, GRID_CONTAINER_PADDING, DROPPING_ITEM_ID } from '../constants';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridAreaProps {
  layouts: Layouts;
  onLayoutChange: (currentLayout: Layout[], allLayouts: Layouts) => void;
  onDropItem: (details: ExtendedDroppedItemDetails) => void;
  onRemoveItem: (itemId: string) => void;
  droppingItem?: { i: string; w: number; h: number };
  onCurrentBreakpointChange: (bp: string) => void;
}

export const GridArea = ({
  layouts,
  onLayoutChange,
  onDropItem,
  onRemoveItem,
  droppingItem,
  onCurrentBreakpointChange,
}: GridAreaProps): React.ReactNode => {

  // This is RGL's onDrop callback signature: (layout: Layout[], item: Layout, e: Event) => void;
  // - `layout`: The new layout array for the current breakpoint *after* the drop.
  // - `item`: The layout item that was dropped (often with i: "__dropping-elem__").
  const handleDrop = (newLayoutForCurrentBreakpoint: Layout[], droppedLayoutItem: Layout | undefined, event: Event) => {
    // Ensure that droppedLayoutItem exists and its 'i' is the placeholder ID
    if (droppedLayoutItem && droppedLayoutItem.i === DROPPING_ITEM_ID) {
      onDropItem({
        newLayoutForCurrentBreakpoint,
        droppedLayoutItem,
      });
    } else if (droppedLayoutItem) {
      // This case might happen if RGL changes its behavior or if there's a misconfiguration.
      // For now, we only proceed if it's the specific placeholder we expect.
      console.warn("Dropped item is not the expected placeholder:", droppedLayoutItem);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Necessary to allow dropping
    event.dataTransfer.dropEffect = "copy";
  };

  // Determine current breakpoint's layout for rendering or default to an empty array
  const currentBreakpointLayoutKey = Object.keys(layouts).find(key => GRID_COLS.hasOwnProperty(key)) || 'lg';
  const itemsToRender = layouts[currentBreakpointLayoutKey] || [];


  return (
    <div
      className="w-full h-full p-4 relative"
      onDragOver={handleDragOver} // onDragOver on the droppable container
    >
      <ResponsiveGridLayout
        className="layout min-h-full bg-gray-50/50 rounded-lg border-2 border-dashed border-gray-300"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={GRID_COLS}
        rowHeight={GRID_ROW_HEIGHT}
        margin={GRID_ITEM_MARGIN}
        containerPadding={GRID_CONTAINER_PADDING}
        onLayoutChange={onLayoutChange}
        onDrop={handleDrop}
        isDroppable={true}
        droppingItem={droppingItem}
        measureBeforeMount={false} // Recommended by RGL docs for server-side rendering or performance
        useCSSTransforms={true}
        preventCollision={true}
        compactType={null}
        resizeHandles={['sw', 'se', 'nw', 'ne', 's', 'w', 'e', 'n']}
        onBreakpointChange={onCurrentBreakpointChange} // Pass up current breakpoint
      >
        {itemsToRender.map((item: GridLayoutItem) => (
          <div
            key={item.i} // Key must be unique and stable
            className={`rounded-lg shadow-lg border border-gray-300 relative group cursor-move bg-white`}
          >
            <GridItemContent
              itemId={item.i}
              paletteItemId={item.paletteItemId}
              onRemoveItem={onRemoveItem}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
      {itemsToRender.length === 0 && !droppingItem && ( // Show placeholder if no items and not dragging
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="text-center text-gray-400 p-10 rounded-lg max-w-md">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-xl font-semibold text-gray-500">Empty Canvas</h3>
            <p className="mt-1 text-sm text-gray-400">
              Drag components from the left panel and drop them here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};