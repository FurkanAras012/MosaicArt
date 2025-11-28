import React, { useState } from 'react';
import type { PaletteType } from '../../types/mosaic.types';
import { PALETTE_SIZE } from '../../constants/validationConstants';
import { useLanguage } from '../../contexts/LanguageContext';

interface PaletteSelectorProps {
  paletteType: PaletteType;
  onPaletteTypeChange: (type: PaletteType) => void;
  paletteSize: number;
  onPaletteSizeChange: (size: number) => void;
  customPalette: string[];
  onCustomPaletteChange: (palette: string[]) => void;
  disabled?: boolean;
}

export const PaletteSelector: React.FC<PaletteSelectorProps> = ({
  paletteType,
  onPaletteTypeChange,
  paletteSize,
  onPaletteSizeChange,
  customPalette,
  onCustomPaletteChange,
  disabled = false,
}) => {
  const { t } = useLanguage();
  const [newColor, setNewColor] = useState('#000000');
  const [colorError, setColorError] = useState<string | null>(null);

  const handleAddColor = () => {
    setColorError(null);

    // Validate hex color
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    if (!hexRegex.test(newColor)) {
      setColorError(t.palette.modes.custom.colorError.invalid);
      return;
    }

    if (customPalette.includes(newColor.toUpperCase())) {
      setColorError(t.palette.modes.custom.colorError.duplicate);
      return;
    }

    onCustomPaletteChange([...customPalette, newColor.toUpperCase()]);
    setNewColor('#000000');
  };

  const handleRemoveColor = (index: number) => {
    onCustomPaletteChange(customPalette.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">{t.palette.title}</label>

        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paletteType"
              value="dynamic"
              checked={paletteType === 'dynamic'}
              onChange={() => onPaletteTypeChange('dynamic')}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <div>
              <p className="font-medium text-gray-900">{t.palette.modes.dynamic.title}</p>
              <p className="text-sm text-gray-500">{t.palette.modes.dynamic.description}</p>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paletteType"
              value="kmeans"
              checked={paletteType === 'kmeans'}
              onChange={() => onPaletteTypeChange('kmeans')}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <div>
              <p className="font-medium text-gray-900">{t.palette.modes.kmeans.title}</p>
              <p className="text-sm text-gray-500">{t.palette.modes.kmeans.description}</p>
            </div>
          </label>

          {paletteType === 'kmeans' && (
            <div className="ml-7 mt-2 space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {t.palette.modes.kmeans.sizeLabel}: {paletteSize} {t.palette.modes.kmeans.colors}
              </label>
              <input
                type="range"
                min={PALETTE_SIZE.MIN}
                max={PALETTE_SIZE.MAX}
                step={PALETTE_SIZE.STEP}
                value={paletteSize}
                onChange={(e) => onPaletteSizeChange(Number(e.target.value))}
                disabled={disabled}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>{PALETTE_SIZE.MIN}</span>
                <span>64</span>
                <span>128</span>
                <span>{PALETTE_SIZE.DEFAULT}</span>
                <span>{PALETTE_SIZE.MAX}</span>
              </div>
            </div>
          )}

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paletteType"
              value="custom"
              checked={paletteType === 'custom'}
              onChange={() => onPaletteTypeChange('custom')}
              disabled={disabled}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
            />
            <div>
              <p className="font-medium text-gray-900">{t.palette.modes.custom.title}</p>
              <p className="text-sm text-gray-500">{t.palette.modes.custom.description}</p>
            </div>
          </label>
        </div>
      </div>

      {paletteType === 'custom' && (
        <div className="border-t pt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">{t.palette.modes.custom.addColor}</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                disabled={disabled}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
              />
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value.toUpperCase())}
                placeholder="#000000"
                disabled={disabled}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleAddColor}
                disabled={disabled}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
{t.common.add}
              </button>
            </div>
            {colorError && <p className="text-sm text-red-600">{colorError}</p>}
          </div>

          {customPalette.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Palette Colors ({customPalette.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {customPalette.map((color, index) => (
                  <div
                    key={index}
                    className="group relative inline-flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md"
                  >
                    <div
                      className="w-6 h-6 rounded border border-gray-300"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-mono">{color}</span>
                    <button
                      onClick={() => handleRemoveColor(index)}
                      disabled={disabled}
                      className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-red-600 hover:text-red-800 disabled:cursor-not-allowed"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customPalette.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Note:</span> Add at least one color to your custom palette
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
