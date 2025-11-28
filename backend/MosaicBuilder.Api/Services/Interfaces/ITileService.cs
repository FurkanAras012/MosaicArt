using MosaicBuilder.Api.Models.DTOs;
using MosaicBuilder.Api.Models.Entities;

namespace MosaicBuilder.Api.Services.Interfaces;

/// <summary>
/// Service for tile grid calculations
/// </summary>
public interface ITileService
{
    /// <summary>
    /// Calculates grid dimensions based on image size and tile size
    /// </summary>
    /// <param name="imageWidth">Image width in pixels</param>
    /// <param name="imageHeight">Image height in pixels</param>
    /// <param name="tileSize">Tile size in pixels</param>
    /// <returns>Grid width and height</returns>
    (int gridWidth, int gridHeight) CalculateGrid(int imageWidth, int imageHeight, int tileSize);

    /// <summary>
    /// Calculates tile pixel size using cm inputs and DPI.
    /// </summary>
    /// <param name="tileSize">Fallback tile size in pixels</param>
    /// <param name="tileWidthCm">Tile width in centimeters</param>
    /// <param name="tileHeightCm">Tile height in centimeters</param>
    /// <param name="dpi">Dots per inch read from image metadata</param>
    /// <returns>Tile size info including cm and pixel values</returns>
    TileSizeInfoDto CalculateTileSize(int tileSize, double? tileWidthCm, double? tileHeightCm, double dpi);

    /// <summary>
    /// Assigns unique identifiers to the provided palette.
    /// </summary>
    /// <param name="colors">Unique color list</param>
    /// <returns>Mapping of hex values to identifiers</returns>
    Dictionary<string, string> GenerateColorCodes(IEnumerable<Models.Entities.Color> colors);

    /// <summary>
    /// Builds the full mosaic grid with coordinates and identifiers.
    /// </summary>
    /// <param name="gridWidth">Number of columns</param>
    /// <param name="gridHeight">Number of rows</param>
    /// <param name="tiles">Tiles with coordinates and hex colors</param>
    /// <param name="colorCodes">Mapping between hex values and identifiers</param>
    /// <returns>Constructed grid</returns>
    MosaicGrid BuildGrid(int gridWidth, int gridHeight, List<TileColorDto> tiles, Dictionary<string, string> colorCodes);

    /// <summary>
    /// Creates printable panels with local coordinates.
    /// </summary>
    /// <param name="grid">Mosaic grid</param>
    /// <param name="panelWidthCm">Panel width in centimeters</param>
    /// <param name="panelHeightCm">Panel height in centimeters</param>
    /// <param name="dpi">Dots per inch for cm to pixel conversion</param>
    /// <param name="tileSize">Tile size in pixels</param>
    /// <returns>List of panel definitions</returns>
    List<PanelDto> BuildPanels(MosaicGrid grid, double? panelWidthCm, double? panelHeightCm, double dpi, int tileSize);
}
