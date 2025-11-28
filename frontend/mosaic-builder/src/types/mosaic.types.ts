export type PaletteType = 'dynamic' | 'kmeans' | 'custom';

export interface MosaicProcessRequest {
  readonly imageBase64: string;
  readonly tileSize: number;
  readonly paletteType: PaletteType;
  readonly paletteSize?: number;
  readonly customPalette?: readonly string[];
  readonly desiredWidthCm?: number;
  readonly desiredHeightCm?: number;
  readonly tileWidthCm?: number;
  readonly tileHeightCm?: number;
  readonly panelWidthCm?: number;
  readonly panelHeightCm?: number;
}

export interface TileColor {
  readonly x: number;
  readonly y: number;
  readonly row: number;
  readonly column: number;
  readonly hex: string;
  readonly colorId: string;
  readonly tileId: string;
}

export interface ColorSummary {
  readonly hex: string;
  readonly count: number;
  readonly colorId: string;
}

export interface TileSizeInfo {
  readonly dpi: number;
  readonly tileWidthCm: number;
  readonly tileHeightCm: number;
  readonly tileSizePixels: number;
}

export interface GridInfo {
  readonly gridWidth: number;
  readonly gridHeight: number;
  readonly tiles: readonly TileColor[];
}

export interface PanelTile {
  readonly localRow: number;
  readonly localColumn: number;
  readonly globalRow: number;
  readonly globalColumn: number;
  readonly colorHex: string;
  readonly colorId: string;
  readonly tileId: string;
}

export interface PanelInfo {
  readonly panelRow: number;
  readonly panelColumn: number;
  readonly label: string;
  readonly startRow: number;
  readonly startColumn: number;
  readonly tilesWide: number;
  readonly tilesHigh: number;
  readonly tiles: readonly PanelTile[];
}

export interface MosaicExports {
  readonly gridJson: string;
  readonly panelsJson: string;
  readonly tileIdCsv: string;
  readonly tileIdJson: string;
}

export interface MosaicProcessResponse {
  readonly gridWidth: number;
  readonly gridHeight: number;
  readonly colors: readonly TileColor[];
  readonly grid: GridInfo;
  readonly paletteSummary: readonly ColorSummary[];
  readonly tileSizeInfo: TileSizeInfo;
  readonly renderImageBase64: string;
  readonly panels: readonly PanelInfo[];
  readonly exports: MosaicExports;
}
