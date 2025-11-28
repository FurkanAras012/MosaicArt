import React, { useState, useEffect } from 'react';


interface TileSettingsProps {
  tileSize: number;
  onTileSizeChange: (size: number) => void;
  imageWidth: number;
  imageHeight: number;
  disabled?: boolean;
}

type SettingMode = 'tileSize' | 'width' | 'height';

const MIN_TILE_SIZE = 1;
const MAX_TILE_SIZE = 100;

export const TileSettings: React.FC<TileSettingsProps> = ({
  tileSize,
  onTileSizeChange,
  imageWidth,
  imageHeight,
  disabled = false,
}) => {
  const [mode, setMode] = useState<SettingMode>('tileSize');
  const [targetWidth, setTargetWidth] = useState<number>(100);
  const [targetHeight, setTargetHeight] = useState<number>(100);

  // Calculate current dimensions in cm (assuming 1 tile = 1 cm)
  const currentWidthCm = imageWidth > 0 ? Math.round(imageWidth / tileSize) : 0;
  const currentHeightCm = imageHeight > 0 ? Math.round(imageHeight / tileSize) : 0;

  // Update target dimensions when tile size or image changes
  useEffect(() => {
    if (imageWidth > 0 && imageHeight > 0) {
      setTargetWidth(currentWidthCm);
      setTargetHeight(currentHeightCm);
    }
  }, [currentWidthCm, currentHeightCm, imageWidth, imageHeight]);

  const handleModeChange = (newMode: SettingMode) => {
    setMode(newMode);
  };

  const handleTileSizeChange = (value: number) => {
    if (value >= MIN_TILE_SIZE && value <= MAX_TILE_SIZE) {
      onTileSizeChange(value);
    }
  };

  const handleWidthChange = (width: number) => {
    if (width > 0 && imageWidth > 0) {
      setTargetWidth(width);
      // Calculate tile size to achieve target width
      const calculatedTileSize = Math.round(imageWidth / width);
      if (calculatedTileSize >= MIN_TILE_SIZE && calculatedTileSize <= MAX_TILE_SIZE) {
        onTileSizeChange(calculatedTileSize);
      }
    }
  };

  const handleHeightChange = (height: number) => {
    if (height > 0 && imageHeight > 0) {
      setTargetHeight(height);
      // Calculate tile size to achieve target height
      const calculatedTileSize = Math.round(imageHeight / height);
      if (calculatedTileSize >= MIN_TILE_SIZE && calculatedTileSize <= MAX_TILE_SIZE) {
        onTileSizeChange(calculatedTileSize);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Mode Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Sizing Mode</label>
        <div className="flex gap-2">
          <button
            onClick={() => handleModeChange('tileSize')}
            disabled={disabled}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'tileSize'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Tile Size
          </button>
          <button
            onClick={() => handleModeChange('width')}
            disabled={disabled || imageWidth === 0}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'width'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Width (cm)
          </button>
          <button
            onClick={() => handleModeChange('height')}
            disabled={disabled || imageHeight === 0}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'height'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Height (cm)
          </button>
        </div>
      </div>

      {/* Tile Size Mode */}
      {mode === 'tileSize' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="tile-size" className="text-sm font-medium text-gray-700">
              Tile Size: {tileSize}px
            </label>
            <input
              type="number"
              min={MIN_TILE_SIZE}
              max={MAX_TILE_SIZE}
              value={tileSize}
              onChange={(e) => handleTileSizeChange(Number(e.target.value))}
              disabled={disabled}
              className="w-20 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <input
              id="tile-size"
              type="range"
              min={MIN_TILE_SIZE}
              max={MAX_TILE_SIZE}
              value={tileSize}
              onChange={(e) => handleTileSizeChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{MIN_TILE_SIZE}px</span>
              <span>{MAX_TILE_SIZE}px</span>
            </div>
          </div>
        </div>
      )}

      {/* Width Mode */}
      {mode === 'width' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="target-width" className="text-sm font-medium text-gray-700 block mb-2">
              Target Width (cm)
            </label>
            <input
              id="target-width"
              type="number"
              min={1}
              max={1000}
              value={targetWidth}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <p className="text-sm text-gray-600">
            Height will be: <span className="font-semibold">{currentHeightCm} cm</span> (ratio preserved)
          </p>
        </div>
      )}

      {/* Height Mode */}
      {mode === 'height' && (
        <div className="space-y-3">
          <div>
            <label htmlFor="target-height" className="text-sm font-medium text-gray-700 block mb-2">
              Target Height (cm)
            </label>
            <input
              id="target-height"
              type="number"
              min={1}
              max={1000}
              value={targetHeight}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <p className="text-sm text-gray-600">
            Width will be: <span className="font-semibold">{currentWidthCm} cm</span> (ratio preserved)
          </p>
        </div>
      )}

      {/* Result Preview */}
      {imageWidth > 0 && imageHeight > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
          <p className="text-sm font-medium text-green-800">Result Preview:</p>
          <div className="grid grid-cols-2 gap-2 text-sm text-green-700">
            <div>
              <span className="font-medium">Dimensions:</span> {currentWidthCm} × {currentHeightCm} cm
            </div>
            <div>
              <span className="font-medium">Grid:</span> {Math.round(imageWidth / tileSize)} × {Math.round(imageHeight / tileSize)} tiles
            </div>
            <div>
              <span className="font-medium">Tile Size:</span> {tileSize} px
            </div>
            <div>
              <span className="font-medium">Total Tiles:</span> {(Math.round(imageWidth / tileSize) * Math.round(imageHeight / tileSize)).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-sm text-blue-800">
          <span className="font-medium">💡 Tip:</span>
          {mode === 'tileSize' && ' Smaller tiles create more detailed mosaics but increase processing time.'}
          {mode === 'width' && ' Set your desired mosaic width. Height will auto-adjust to preserve the image ratio.'}
          {mode === 'height' && ' Set your desired mosaic height. Width will auto-adjust to preserve the image ratio.'}
        </p>
      </div>
    </div>
  );
};
