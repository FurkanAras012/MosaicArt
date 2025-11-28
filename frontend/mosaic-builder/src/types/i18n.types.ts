// Localization types and interfaces

export type Language = 'tr' | 'en';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  
  // Image Upload
  imageUpload: {
    title: string;
    dragDrop: string;
    browse: string;
    supportedFormats: string;
    maxSize: string;
    error: {
      invalidFormat: string;
      fileTooLarge: string;
      uploadFailed: string;
    };
  };
  
  // Tile Settings
  tileSettings: {
    title: string;
    tileSize: string;
    gridPreview: string;
    gridSize: string;
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
  };
  
  // Results
  results: {
    title: string;
    gridSize: string;
    colorCount: string;
    downloadImage: string;
    exportCsv: string;
    exportJson: string;
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
  };
}