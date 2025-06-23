
import React, { useState, useCallback } from 'react';
import { Drawer } from './components/Drawer';
import { GridArea } from './components/GridArea';
// import { SizeConfigModal } from './components/SizeConfigModal'; // Modal no longer used in initial flow
import { PALETTE_ITEMS, DROPPING_ITEM_ID, GRID_COLS } from './constants';
import { PaletteItemType, GridLayoutItem, ExtendedDroppedItemDetails } from './types';
import type { Layouts, Layout } from 'react-grid-layout';

const App = (): React.ReactNode => {
  const [layouts, setLayouts] = useState<Layouts>({});
  const [currentlyDraggingPaletteItem, setCurrentlyDraggingPaletteItem] = useState<PaletteItemType | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>(Object.keys(GRID_COLS)[0] || 'lg');

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen(prev => !prev);
  }, []);

  const handleDragStartPaletteItem = useCallback((item: PaletteItemType) => {
    setCurrentlyDraggingPaletteItem(item);
  }, []);

  const handleDragEndPaletteItem = useCallback(() => {
    setTimeout(() => {
      setCurrentlyDraggingPaletteItem(null);
    }, 0);
  }, []);

  const handleBreakpointChange = useCallback((newBp: string) => {
    setCurrentBreakpoint(newBp);
  }, []);

  const handleDropItemOnGrid = useCallback((details: ExtendedDroppedItemDetails) => {
    if (!currentlyDraggingPaletteItem) return;

    const { newLayoutForCurrentBreakpoint, droppedLayoutItem } = details;
    const paletteItem = currentlyDraggingPaletteItem;
    const placeholderId = droppedLayoutItem.i; 

    if (placeholderId !== DROPPING_ITEM_ID) {
        console.warn("Dropped item ID doesn't match expected placeholder ID.", placeholderId);
        // Depending on strictness, one might choose to return or handle this case.
    }

    const newPermanentId = `item-${paletteItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // This will hold the fully finalized new item that can be propagated to other layouts
    let finalizedNewItemForPropagation: GridLayoutItem | null = null;

    setLayouts(prevLayouts => {
      const newLayoutsState = { ...prevLayouts };

      // Process the current breakpoint's layout
      const updatedCurrentBpLayout = newLayoutForCurrentBreakpoint.map(rglItem => {
        if (rglItem.i === placeholderId) {
          const finalizedItem = {
            ...rglItem, 
            i: newPermanentId,
            paletteItemId: paletteItem.id,
            minW: paletteItem.minW || 1,
            minH: paletteItem.minH || 1,
            static: false,
            // Remove RGL internal props that we don't want to persist if any
            isDraggable: undefined, 
            isResizable: undefined,
          };
          finalizedNewItemForPropagation = finalizedItem as GridLayoutItem; // Capture the finalized item
          return finalizedItem as GridLayoutItem;
        } else {
          // For existing items, merge RGL's new geometry with our stored custom props
          const existingItemFromState = (prevLayouts[currentBreakpoint] || []).find(it => it.i === rglItem.i) as GridLayoutItem | undefined;
          return {
            ...(existingItemFromState || {}), // Start with our stored item (has paletteItemId and other custom props)
            ...rglItem, // Apply RGL's geometry updates (x,y,w,h)
            i: rglItem.i, // Ensure ID is from rglItem
            // Crucially, ensure paletteItemId is preserved from our state
            paletteItemId: existingItemFromState ? existingItemFromState.paletteItemId : '', 
          } as GridLayoutItem;
        }
      });
      newLayoutsState[currentBreakpoint] = updatedCurrentBpLayout;

      // Propagate the *newly added and finalized* item to other breakpoints
      if (finalizedNewItemForPropagation) {
        Object.keys(GRID_COLS).forEach(bpKey => {
          if (bpKey !== currentBreakpoint) {
            let bpLayout = (newLayoutsState[bpKey] || []).filter(
              it => it.i !== placeholderId && it.i !== newPermanentId // Remove any old placeholder or temp version
            );
            // Add a copy of the finalized new item. RGL will handle its x,y for this breakpoint.
            bpLayout.push({ ...finalizedNewItemForPropagation }); 
            newLayoutsState[bpKey] = bpLayout as GridLayoutItem[];
          }
        });
      } else {
          console.error("Failed to create the finalized new item for propagation during drop.");
      }
      return newLayoutsState;
    });

  }, [currentlyDraggingPaletteItem, currentBreakpoint]);


  const handleLayoutChange = useCallback(
    (_currentLayout: Layout[], allUpdatedLayoutsFromRGL: Layouts) => {
      setLayouts(prevLayouts => {
        const newLayoutsState: Layouts = {};
        let hasChangedOverall = false;

        for (const breakpointKey in allUpdatedLayoutsFromRGL) {
          if (allUpdatedLayoutsFromRGL.hasOwnProperty(breakpointKey)) {
            const rglLayoutForBp = allUpdatedLayoutsFromRGL[breakpointKey];
            const prevLayoutForBp = (prevLayouts[breakpointKey] || []) as GridLayoutItem[];
            
            let bpChanged = false;
            if (rglLayoutForBp.length !== prevLayoutForBp.length) {
                bpChanged = true;
            }

            newLayoutsState[breakpointKey] = rglLayoutForBp.map(rglItem => {
              const existingItem = prevLayoutForBp.find(pi => pi.i === rglItem.i);
              
              const mergedItem: GridLayoutItem = {
                ...(existingItem || {} as GridLayoutItem), // Keeps custom props from existing item
                ...rglItem, // Overwrites with x,y,w,h etc. from RGL
                // Ensure paletteItemId is correctly preserved or set
                paletteItemId: existingItem ? existingItem.paletteItemId : '', // Corrected line
                i: rglItem.i, // Ensure 'i' is definitely from rglItem
              };

              if (!existingItem || JSON.stringify(existingItem) !== JSON.stringify(mergedItem)) {
                bpChanged = true;
              }
              return mergedItem;
            });
            if(bpChanged) hasChangedOverall = true;
          }
        }
        
        // Check if any breakpoints were removed from the layouts in prevLayouts
        for (const breakpointKey in prevLayouts) {
          if (prevLayouts.hasOwnProperty(breakpointKey) && !newLayoutsState.hasOwnProperty(breakpointKey)) {
            hasChangedOverall = true;
            break;
          }
        }
  
        return hasChangedOverall ? newLayoutsState : prevLayouts;
      });
    },
    [] 
  );

  const handleRemoveItem = useCallback((itemIdToRemove: string) => {
    setLayouts(prevLayouts => {
      const newLayouts: Layouts = {};
      for (const breakpointKey in prevLayouts) {
        newLayouts[breakpointKey] = prevLayouts[breakpointKey].filter(item => item.i !== itemIdToRemove);
      }
      return newLayouts;
    });
  }, []);

  const droppingItemConfig = currentlyDraggingPaletteItem
    ? {
        i: DROPPING_ITEM_ID, 
        w: currentlyDraggingPaletteItem.defaultWidth,
        h: currentlyDraggingPaletteItem.defaultHeight,
      }
    : undefined;

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
        <Drawer
          paletteItems={PALETTE_ITEMS}
          onDragStartItem={handleDragStartPaletteItem}
          onDragEndItem={handleDragEndPaletteItem}
          isDrawerOpen={isDrawerOpen}
          onToggleDrawer={toggleDrawer}
        />
        <main className="flex-1 overflow-auto bg-gray-200">
          <GridArea
            layouts={layouts}
            onLayoutChange={handleLayoutChange}
            onDropItem={handleDropItemOnGrid}
            onRemoveItem={handleRemoveItem}
            droppingItem={droppingItemConfig}
            onCurrentBreakpointChange={handleBreakpointChange}
          />
        </main>
      </div>
    </>
  );
};

export default App;
