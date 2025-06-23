
import React, { useState, useEffect } from 'react';
import { PaletteItemType } from '../types';
import { GRID_COLS } from '../constants';

interface SizeConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (width: number, height: number) => void;
  item: PaletteItemType;
}

export const SizeConfigModal = ({ isOpen, onClose, onConfirm, item }: SizeConfigModalProps): React.ReactNode => {
  const [width, setWidth] = useState(item.defaultWidth);
  const [height, setHeight] = useState(item.defaultHeight);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setWidth(item.defaultWidth);
      setHeight(item.defaultHeight);
      setError(null);
    }
  }, [isOpen, item]);

  if (!isOpen) {
    return null;
  }

  const minW = item.minW || 1;
  const minH = item.minH || 1;
  const maxW = GRID_COLS.lg; // Max width is the total number of columns in the largest breakpoint

  const handleConfirm = () => {
    const newError: string[] = [];
    if (width < minW) {
      newError.push(`Width must be at least ${minW}.`);
    }
    if (width > maxW) {
        newError.push(`Width cannot exceed ${maxW}.`);
    }
    if (height < minH) {
      newError.push(`Height must be at least ${minH}.`);
    }

    if (newError.length > 0) {
      setError(newError.join(' '));
      return;
    }
    setError(null);
    onConfirm(width, height);
  };

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-config-modal-title"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 id="size-config-modal-title" className="text-xl font-semibold mb-1 text-gray-800">Configure Component Size</h2>
        <p className="text-sm text-gray-600 mb-4">Set the dimensions for: <span className="font-medium">{item.name}</span></p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="component-width" className="block text-sm font-medium text-gray-700 mb-1">
              Width (columns)
            </label>
            <input
              type="number"
              id="component-width"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value, 10))}
              min={minW}
              max={maxW}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              aria-describedby="width-constraints"
            />
            <p id="width-constraints" className="text-xs text-gray-500 mt-1">Min: {minW}, Max: {maxW}</p>
          </div>
          <div>
            <label htmlFor="component-height" className="block text-sm font-medium text-gray-700 mb-1">
              Height (rows)
            </label>
            <input
              type="number"
              id="component-height"
              value={height}
              onChange={(e) => setHeight(parseInt(e.target.value, 10))}
              min={minH}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              aria-describedby="height-constraints"
            />
            <p id="height-constraints" className="text-xs text-gray-500 mt-1">Min: {minH}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
