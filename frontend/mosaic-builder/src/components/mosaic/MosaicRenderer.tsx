import React, { useEffect, useMemo, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { useLanguage } from '../../contexts/LanguageContext';
import type { PanelInfo, TileColor } from '../../types/mosaic.types';

interface MosaicRendererProps {
  imageBase64: string;
  gridWidth: number;
  gridHeight: number;
  tileSizePx: number;
  tiles: readonly TileColor[];
  panels: readonly PanelInfo[];
}

export const MosaicRenderer: React.FC<MosaicRendererProps> = ({
  imageBase64,
  gridWidth,
  gridHeight,
  tileSizePx,
  tiles,
  panels,
}) => {
  const { t } = useLanguage();
  const imageRef = useRef<HTMLImageElement>(null);
  const [renderSize, setRenderSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (!imageRef.current) return;
    const handleResize = () => {
      setRenderSize({
        width: imageRef.current?.clientWidth || 0,
        height: imageRef.current?.clientHeight || 0,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imageBase64]);

  const handleDownload = () => {
    const base64Data = imageBase64.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    saveAs(blob, `mosaic-${gridWidth}x${gridHeight}-${timestamp}.png`);
  };

  const gridPixelWidth = useMemo(() => gridWidth * tileSizePx, [gridWidth, tileSizePx]);
  const gridPixelHeight = useMemo(() => gridHeight * tileSizePx, [gridHeight, tileSizePx]);

  const scaleX = gridPixelWidth > 0 ? (renderSize.width || gridPixelWidth) / gridPixelWidth : 1;
  const scaleY = gridPixelHeight > 0 ? (renderSize.height || gridPixelHeight) / gridPixelHeight : 1;

  const gridStyle = useMemo(
    () => ({
      backgroundImage:
        'linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)',
      backgroundSize: `${tileSizePx * scaleX}px ${tileSizePx * scaleY}px`,
    }),
    [scaleX, scaleY, tileSizePx]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t.results.mosaic.sectionTitle}</h3>
          <p className="text-sm text-gray-600">{t.results.mosaic.gridLabel}: {gridWidth} × {gridHeight}</p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {t.results.mosaic.download}
        </button>
      </div>

      <div className="relative bg-gray-100 rounded-lg overflow-hidden">
        <img
          ref={imageRef}
          src={imageBase64}
          alt="Mosaic"
          aria-label={`Mosaic preview with ${tiles.length} tiles`}
          className="w-full h-auto"
          onLoad={() => {
            if (!imageRef.current) return;
            setRenderSize({ width: imageRef.current.clientWidth, height: imageRef.current.clientHeight });
          }}
        />
        <div className="absolute inset-0 pointer-events-none" style={gridStyle} />

        <div className="absolute inset-0 pointer-events-none">
          {panels.map((panel) => {
            const left = (panel.startColumn - 1) * tileSizePx * scaleX;
            const top = (panel.startRow - 1) * tileSizePx * scaleY;
            const width = panel.tilesWide * tileSizePx * scaleX;
            const height = panel.tilesHigh * tileSizePx * scaleY;
            return (
              <div
                key={`${panel.panelRow}-${panel.panelColumn}`}
                className="absolute border-2 border-red-500 rounded-sm"
                style={{ left, top, width, height }}
              >
                <span className="absolute -top-3 left-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded shadow">
                  {panel.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-sm text-green-800">
          <span className="font-medium">{t.common.success}</span> {t.results.mosaic.success}
        </p>
      </div>
    </div>
  );
};
