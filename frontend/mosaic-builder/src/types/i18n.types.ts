// Localization types and interfaces

export type Language = 'tr' | 'en';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  footer: string;
  
  // Image Upload
  imageUpload: {
    title: string;
    dragDrop: string;
    browse: string;
    supportedFormats: string;
    maxSize: string;
    dropActive: string;
    uploadCta: string;
    uploadOr: string;
    uploadHelp: string;
    error: {
      invalidFormat: string;
      fileTooLarge: string;
      uploadFailed: string;
      selectValidFile: string;
      loadDimensionsFailed: string;
      readFileFailed: string;
    };
  };
  
  // Tile Settings
  tileSettings: {
    title: string;
    tileSize: string;
    gridPreview: string;
    gridSize: string;
    sizingMode: string;
    modeOptions: {
      tileSize: string;
      width: string;
      height: string;
    };
    labels: {
      tileSizeValue: string;
      targetWidth: string;
      targetHeight: string;
      widthResult: string;
      heightResult: string;
      unitCm: string;
      ratioPreserved: string;
      resultPreview: string;
      dimensions: string;
      grid: string;
      tileSize: string;
      totalTiles: string;
    };
    tips: {
      title: string;
      tileSize: string;
      width: string;
      height: string;
    };
  };
  
  // Palette
  palette: {
    title: string;
    modes: {
      dynamic: {
        title: string;
        description: string;
      };
      kmeans: {
        title: string;
        description: string;
        sizeLabel: string;
        colors: string;
      };
      custom: {
        title: string;
        description: string;
        addColor: string;
        paletteLabel: string;
        emptyNote: string;
        colorError: {
          invalid: string;
          duplicate: string;
        };
      };
    };
  };
  
  // Processing
    processing: {
      button: string;
      processing: string;
      uploadFirst: string;
      customPaletteRequired: string;
      processingHint: string;
      failed: string;
    };
  
  // Results
  results: {
    title: string;
    gridSize: string;
    colorCount: string;
    downloadImage: string;
    exportCsv: string;
    exportJson: string;
    mosaic: {
      title: string;
      sectionTitle: string;
      gridLabel: string;
      download: string;
      success: string;
    };
    analysis: {
      title: string;
      stats: {
        gridSize: string;
        totalTiles: string;
        uniqueColors: string;
      };
      exports: {
        csv: string;
        json: string;
      };
      table: {
        title: string;
        color: string;
        hexCode: string;
        tileCount: string;
        percentage: string;
        colorLabelPrefix: string;
      };
    };
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    add: string;
    remove: string;
    note?: string;
  };
}