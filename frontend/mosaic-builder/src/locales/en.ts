import type { Translations } from '../types/i18n.types';

export const en: Translations = {
  title: 'MosaicBuilder',
  subtitle: 'Smart application that converts images into mosaic tiles',
  
  imageUpload: {
    title: 'Image Upload',
    dragDrop: 'Drag & drop your image here',
    browse: 'Browse Files',
    supportedFormats: 'Supported formats',
    maxSize: 'Maximum size',
    error: {
      invalidFormat: 'Invalid file format',
      fileTooLarge: 'File size too large',
      uploadFailed: 'Upload failed'
    }
  },
  
  tileSettings: {
    title: 'Mosaic Settings',
    tileSize: 'Tile Size',
    gridPreview: 'Grid Preview',
    gridSize: 'Grid Size'
  },
  
  palette: {
    title: 'Color Palette',
    modes: {
      dynamic: {
        title: 'Full Color (Dynamic)',
        description: 'Use all original colors from the image'
      },
      kmeans: {
        title: 'K-Means Clustering',
        description: 'Reduce colors using K-Means algorithm',
        sizeLabel: 'Palette Size',
        colors: 'colors'
      },
      custom: {
        title: 'Custom Palette',
        description: 'Define your own color palette',
        addColor: 'Add Color',
        colorError: {
          invalid: 'Invalid hex color format',
          duplicate: 'Color already in palette'
        }
      }
    }
  },
  
  processing: {
    button: 'Create Mosaic',
    processing: 'Processing...',
    uploadFirst: 'Please upload an image first',
    customPaletteRequired: 'Custom palette requires at least one color'
  },
  
  results: {
    title: 'Results',
    gridSize: 'Grid Size',
    colorCount: 'Color Count',
    downloadImage: 'Download Image',
    exportCsv: 'Export CSV',
    exportJson: 'Export JSON'
  },
  
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove'
  }
};