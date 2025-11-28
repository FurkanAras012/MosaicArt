// Validation constants for mosaic processing

export const PALETTE_SIZE = {
  MIN: 16,
  MAX: 512,
  DEFAULT: 256,
  STEP: 16
} as const;

export const TILE_SIZE = {
  MIN: 1,
  MAX: 1000,
  DEFAULT: 10
} as const;

export const FILE_SIZE = {
  MAX_MB: 10,
  MAX_BYTES: 10 * 1024 * 1024
} as const;

export const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'] as const;

export const PALETTE_TYPES = {
  DYNAMIC: 'dynamic',
  KMEANS: 'kmeans',
  CUSTOM: 'custom'
} as const;