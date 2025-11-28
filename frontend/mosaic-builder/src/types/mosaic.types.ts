export type PaletteType = 'dynamic' | 'kmeans' | 'custom';

export interface MosaicProcessRequest {
  readonly imageBase64: string;
  readonly tileSize: number;
  readonly paletteType: PaletteType;
  readonly paletteSize?: number;
  readonly customPalette?: readonly string[];
  readonly desiredWidthCm?: number;
  readonly desiredHeightCm?: number;
}

export interface TileColor {
  readonly x: number;
  readonly y: number;
  readonly hex: string;
}

export interface ColorSummary {
  readonly hex: string;
  readonly count: number;
}

export interface MosaicProcessResponse {
  readonly gridWidth: number;
  readonly gridHeight: number;
  readonly colors: readonly TileColor[];
  readonly paletteSummary: readonly ColorSummary[];
  readonly renderImageBase64: string;
}
