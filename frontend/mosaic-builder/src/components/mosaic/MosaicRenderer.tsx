import React from 'react';
import { saveAs } from 'file-saver';
import { useLanguage } from '../../contexts/LanguageContext';

interface MosaicRendererProps {
  imageBase64: string;
  gridWidth: number;
  gridHeight: number;
}

export const MosaicRenderer: React.FC<MosaicRendererProps> = ({ imageBase64, gridWidth, gridHeight }) => {
  const { t } = useLanguage();
  const handleDownload = () => {
    // Convert base64 to blob
    const base64Data = imageBase64.split(',')[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Download
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    saveAs(blob, `mosaic-${gridWidth}x${gridHeight}-${timestamp}.png`);
  };

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
        <img src={imageBase64} alt="Mosaic" className="w-full h-auto" />
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-sm text-green-800">
          <span className="font-medium">{t.common.success}</span> {t.results.mosaic.success}
        </p>
      </div>
    </div>
  );
};
