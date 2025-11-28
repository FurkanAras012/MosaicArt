import type { Translations } from '../types/i18n.types';

export const en: Translations = {
  title: 'MosaicBuilder',
  subtitle: 'Smart application that converts images into mosaic tiles',
  footer: 'MosaicBuilder - Production-Ready Mosaic Generation System',

  imageUpload: {
    title: 'Image Upload',
    dragDrop: 'Drag & drop your image here',
    browse: 'Browse Files',
    supportedFormats: 'Supported formats',
    maxSize: 'Maximum size',
    dropActive: 'Drop the image here',
    uploadCta: 'Click to upload',
    uploadOr: 'or drag and drop',
    uploadHelp: 'PNG, JPG up to 10MB',
    error: {
      invalidFormat: 'Invalid file format',
      fileTooLarge: 'File size too large',
      uploadFailed: 'Upload failed',
      selectValidFile: 'Please select a valid image file (JPG or PNG)',
      loadDimensionsFailed: 'Failed to load image dimensions',
      readFileFailed: 'Failed to read file'
    }
  },

  tileSettings: {
    title: 'Mosaic Settings',
    tileSize: 'Tile Size',
    gridPreview: 'Grid Preview',
    gridSize: 'Grid Size',
    sizingMode: 'Sizing Mode',
    modeOptions: {
      tileSize: 'Tile Size',
      width: 'Width (cm)',
      height: 'Height (cm)'
    },
    labels: {
      tileSizeValue: 'Tile Size',
      targetWidth: 'Target Width (cm)',
      targetHeight: 'Target Height (cm)',
      widthResult: 'Height will be',
      heightResult: 'Width will be',
      unitCm: 'cm',
      ratioPreserved: '(ratio preserved)',
      resultPreview: 'Result Preview:',
      dimensions: 'Dimensions:',
      grid: 'Grid (tiles):',
      tileSize: 'Tile Size:',
      totalTiles: 'Total Tiles:',
      physicalTile: 'Physical Tile (cm)',
      tileWidthCm: 'Tile Width (cm)',
      tileHeightCm: 'Tile Height (cm)',
      physicalHint: 'Tile width/height will be converted to pixels using the image DPI.',
      panelTitle: 'Panel Size (cm)',
      panelWidthCm: 'Panel Width (cm)',
      panelHeightCm: 'Panel Height (cm)',
      panelHint: 'Define printable panel dimensions. Local coordinates start at (1,1).'
    },
    tips: {
      title: '💡 Tip:',
      tileSize: ' Smaller tiles create more detailed mosaics but increase processing time.',
      width: ' Set your desired mosaic width. Height will auto-adjust to preserve the image ratio.',
      height: ' Set your desired mosaic height. Width will auto-adjust to preserve the image ratio.'
    }
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
        paletteLabel: 'Palette Colors',
        emptyNote: 'Add at least one color to your custom palette',
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
      customPaletteRequired: 'Custom palette requires at least one color',
      processingHint: 'This may take a few moments depending on image size and settings',
      failed: 'Failed to process mosaic. Please try again.'
    },

  results: {
    title: 'Results',
    gridSize: 'Grid Size',
    colorCount: 'Color Count',
    downloadImage: 'Download Image',
    exportCsv: 'Export CSV',
    exportJson: 'Export JSON',
    mosaic: {
      title: 'Your Mosaic',
      sectionTitle: 'Mosaic Result',
      gridLabel: 'Grid Size',
      download: 'Download PNG',
      success: 'Your mosaic has been generated successfully'
    },
    analysis: {
      title: 'Color Analysis',
      stats: {
        gridSize: 'Grid Size',
        totalTiles: 'Total Tiles',
        uniqueColors: 'Unique Colors',
        tileSize: 'Tile Size',
        dpiDetected: 'DPI',
        panels: 'Panels',
        panelHint: 'Local coordinates reset in every panel'
      },
      exports: {
        csv: 'Export CSV',
        json: 'Export JSON',
        gridJson: 'Grid JSON',
        panelJson: 'Panel JSON',
        tileIdCsv: 'Tile IDs CSV',
        tileIdJson: 'Tile IDs JSON'
      },
      table: {
        title: 'Color Usage Summary',
        color: 'Color',
        hexCode: 'Hex Code',
        tileCount: 'Tile Count',
        percentage: 'Percentage',
        colorLabelPrefix: 'Color'
      }
    }
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
    remove: 'Remove',
    note: 'Note:'
  }
};
