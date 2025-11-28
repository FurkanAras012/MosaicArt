import { useState } from 'react';
import type { MosaicProcessRequest, MosaicProcessResponse, PaletteType } from './types/mosaic.types';
import { ImageUploader } from './components/mosaic/ImageUploader';
import { TileSettings } from './components/mosaic/TileSettings';
import { PaletteSelector } from './components/mosaic/PaletteSelector';
import { MosaicRenderer } from './components/mosaic/MosaicRenderer';
import { ResultsPanel } from './components/mosaic/ResultsPanel';
import { LanguageSelector } from './components/common/LanguageSelector';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { mosaicApi } from './services/mosaicApi';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [imageBase64, setImageBase64] = useState<string>('');
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [tileSize, setTileSize] = useState<number>(10);
  const [tileWidthCm, setTileWidthCm] = useState<number>(0);
  const [tileHeightCm, setTileHeightCm] = useState<number>(0);
  const [panelWidthCm, setPanelWidthCm] = useState<number>(0);
  const [panelHeightCm, setPanelHeightCm] = useState<number>(0);
  const [paletteType, setPaletteType] = useState<PaletteType>('dynamic');
  const [paletteSize, setPaletteSize] = useState<number>(256);
  const [customPalette, setCustomPalette] = useState<string[]>([]);
  const [mosaicResult, setMosaicResult] = useState<MosaicProcessResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64: string, width: number, height: number) => {
    setImageBase64(base64);
    setImageDimensions({ width, height });
  };

  const handleProcessMosaic = async () => {
    if (!imageBase64) {
      setError(t.processing.uploadFirst);
      return;
    }

    if (paletteType === 'custom' && customPalette.length === 0) {
      setError(t.processing.customPaletteRequired);
      return;
    }

    setError(null);
    setIsProcessing(true);
    setMosaicResult(null);

    try {
      const requestBody: MosaicProcessRequest = {
        imageBase64,
        tileSize,
        paletteType,
        paletteSize: paletteType === 'kmeans' ? paletteSize : undefined,
        customPalette: paletteType === 'custom' ? customPalette : undefined,
        tileWidthCm: tileWidthCm > 0 ? tileWidthCm : undefined,
        tileHeightCm: tileHeightCm > 0 ? tileHeightCm : undefined,
        panelWidthCm: panelWidthCm > 0 ? panelWidthCm : undefined,
        panelHeightCm: panelHeightCm > 0 ? panelHeightCm : undefined,
      };

      const response = await mosaicApi.processMosaic(requestBody);

      setMosaicResult(response);
    } catch (err) {
      console.error('Error processing mosaic:', err);
      setError(err instanceof Error ? err.message : t.processing.failed);
    } finally {
      setIsProcessing(false);
    }
  };

  const canProcess = imageBase64 && (paletteType !== 'custom' || customPalette.length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 relative">
          <div className="absolute top-0 right-0">
            <LanguageSelector />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </header>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Image Uploader Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">1. {t.imageUpload.title}</h2>
            <ImageUploader onImageUpload={handleImageUpload} disabled={isProcessing} />
          </div>

          {/* Settings Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">2. {t.tileSettings.title}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">{t.tileSettings.tileSize}</h3>
                <TileSettings
                  tileSize={tileSize}
                  onTileSizeChange={setTileSize}
                  imageWidth={imageDimensions.width}
                  imageHeight={imageDimensions.height}
                  tileWidthCm={tileWidthCm}
                  tileHeightCm={tileHeightCm}
                  panelWidthCm={panelWidthCm}
                  panelHeightCm={panelHeightCm}
                  onTileWidthCmChange={setTileWidthCm}
                  onTileHeightCmChange={setTileHeightCm}
                  onPanelWidthCmChange={setPanelWidthCm}
                  onPanelHeightCmChange={setPanelHeightCm}
                  disabled={isProcessing}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">{t.palette.title}</h3>
                <PaletteSelector
                  paletteType={paletteType}
                  onPaletteTypeChange={setPaletteType}
                  paletteSize={paletteSize}
                  onPaletteSizeChange={setPaletteSize}
                  customPalette={customPalette}
                  onCustomPaletteChange={setCustomPalette}
                  disabled={isProcessing}
                />
              </div>
            </div>
          </div>

          {/* Process Button */}
          <div className="flex justify-center">
            <button
              onClick={handleProcessMosaic}
              disabled={!canProcess || isProcessing}
              className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
            >
              {isProcessing ? t.processing.processing : t.processing.button}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* Results Section */}
          {mosaicResult && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">3. {t.results.mosaic.title}</h2>
                <MosaicRenderer
                  imageBase64={mosaicResult.renderImageBase64}
                  gridWidth={mosaicResult.gridWidth}
                  gridHeight={mosaicResult.gridHeight}
                  tileSizePx={mosaicResult.tileSizeInfo.tileSizePixels}
                  tiles={mosaicResult.colors}
                  panels={mosaicResult.panels}
                />
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">4. {t.results.analysis.title}</h2>
                {(() => {
                  const panelCount = mosaicResult.panels.length
                    ? {
                        x: Math.max(...mosaicResult.panels.map((panel) => panel.panelColumn)) + 1,
                        y: Math.max(...mosaicResult.panels.map((panel) => panel.panelRow)) + 1,
                      }
                    : { x: 0, y: 0 };
                  return (
                    <ResultsPanel
                      paletteSummary={mosaicResult.paletteSummary}
                      gridWidth={mosaicResult.gridWidth}
                      gridHeight={mosaicResult.gridHeight}
                      tileSizeInfo={mosaicResult.tileSizeInfo}
                      exports={mosaicResult.exports}
                      panelCount={panelCount}
                    />
                  );
                })()}
              </div>
            </>
          )}

          {/* Loading State */}
          {isProcessing && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                  <p className="text-xl font-semibold text-gray-900">{t.processing.processing}</p>
                  <p className="text-sm text-gray-600 text-center">{t.processing.processingHint}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>{t.footer}</p>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
