import React from 'react';
import type { ColorSummary, MosaicExports, TileSizeInfo } from '../../types/mosaic.types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ResultsPanelProps {
  paletteSummary: readonly ColorSummary[];
  gridWidth: number;
  gridHeight: number;
  tileSizeInfo: TileSizeInfo;
  exports: MosaicExports;
  panelCount: { x: number; y: number };
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ paletteSummary, gridWidth, gridHeight, tileSizeInfo, exports, panelCount }) => {
  const { t } = useLanguage();
  const totalTiles = gridWidth * gridHeight;
  const uniqueColors = paletteSummary.length;

  const handleExportCSV = () => {
    const csvContent = [
      `${t.results.analysis.table.color},${t.results.analysis.table.hexCode},${t.results.analysis.table.tileCount},${t.results.analysis.table.percentage}`,
      ...paletteSummary.map((color, index) => {
        const percentage = ((color.count / totalTiles) * 100).toFixed(2);
        return `${t.results.analysis.table.colorLabelPrefix} ${index + 1},${color.hex},${color.count},${percentage}%`;
      }),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `mosaic-colors-${gridWidth}x${gridHeight}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportGridJson = () => downloadFile(exports.gridJson, `mosaic-grid-${gridWidth}x${gridHeight}.json`, 'application/json');

  const handleExportPanelsJson = () =>
    downloadFile(exports.panelsJson, `mosaic-panels-${panelCount.x}x${panelCount.y}.json`, 'application/json');

  const handleExportTileIdCsv = () => downloadFile(exports.tileIdCsv, `mosaic-tile-ids-${gridWidth}x${gridHeight}.csv`, 'text/csv');

  const handleExportTileIdJson = () =>
    downloadFile(exports.tileIdJson, `mosaic-tile-ids-${gridWidth}x${gridHeight}.json`, 'application/json');

  const handleExportJSON = () => {
    const jsonData = {
      gridDimensions: { width: gridWidth, height: gridHeight },
      totalTiles,
      uniqueColors,
      colorSummary: paletteSummary.map((color) => ({
        hex: color.hex,
        count: color.count,
        percentage: ((color.count / totalTiles) * 100).toFixed(2) + '%',
      })),
    };

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `mosaic-data-${gridWidth}x${gridHeight}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-600 font-medium mb-1">{t.results.analysis.stats.gridSize}</p>
          <p className="text-2xl font-bold text-blue-900">
            {gridWidth} × {gridHeight}
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-600 font-medium mb-1">{t.results.analysis.stats.totalTiles}</p>
          <p className="text-2xl font-bold text-green-900">{totalTiles.toLocaleString()}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-sm text-purple-600 font-medium mb-1">{t.results.analysis.stats.uniqueColors}</p>
          <p className="text-2xl font-bold text-purple-900">{uniqueColors}</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-700 font-medium mb-1">{t.results.analysis.stats.tileSize}</p>
          <p className="text-lg font-bold text-amber-900">{tileSizeInfo.tileSizePixels} px</p>
          <p className="text-sm text-amber-800">{tileSizeInfo.tileWidthCm.toFixed(2)} × {tileSizeInfo.tileHeightCm.toFixed(2)} cm</p>
          <p className="text-xs text-amber-700">{t.results.analysis.stats.dpiDetected}: {tileSizeInfo.dpi.toFixed(1)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 font-medium mb-1">{t.results.analysis.stats.panels}</p>
          <p className="text-lg font-bold text-red-900">{panelCount.x} × {panelCount.y}</p>
          <p className="text-xs text-red-700">{t.results.analysis.stats.panelHint}</p>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {t.results.analysis.exports.csv}
        </button>
        <button
          onClick={handleExportJSON}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {t.results.analysis.exports.json}
        </button>
        <button
          onClick={handleExportGridJson}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8M8 12h8m-8 5h8" />
          </svg>
          {t.results.analysis.exports.gridJson}
        </button>
        <button
          onClick={handleExportPanelsJson}
          className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
          {t.results.analysis.exports.panelJson}
        </button>
        <button
          onClick={handleExportTileIdCsv}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2z" />
          </svg>
          {t.results.analysis.exports.tileIdCsv}
        </button>
        <button
          onClick={handleExportTileIdJson}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-8-4h8M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2h-5.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0010.586 2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          {t.results.analysis.exports.tileIdJson}
        </button>
      </div>

      {/* Color Summary Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{t.results.analysis.table.title}</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.results.analysis.table.color}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.results.analysis.table.hexCode}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.results.analysis.table.tileCount}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t.results.analysis.table.percentage}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paletteSummary.map((color, index) => {
                const percentage = ((color.count / totalTiles) * 100).toFixed(2);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded border border-gray-300 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-sm text-gray-500">{`${t.results.analysis.table.colorLabelPrefix} ${index + 1}`}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900">{color.hex}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{color.count.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-24">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
