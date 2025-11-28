namespace MosaicBuilder.Api.Models.Entities;

/// <summary>
/// Represents a single tile placement within the mosaic grid.
/// </summary>
public class Tile
{
    /// <summary>
    /// Zero-based X coordinate (column) for rendering purposes.
    /// </summary>
    public int X { get; set; }

    /// <summary>
    /// Zero-based Y coordinate (row) for rendering purposes.
    /// </summary>
    public int Y { get; set; }

    /// <summary>
    /// One-based column index used for exports and panel calculations.
    /// </summary>
    public int Column { get; set; }

    /// <summary>
    /// One-based row index used for exports and panel calculations.
    /// </summary>
    public int Row { get; set; }

    /// <summary>
    /// Hexadecimal color value for the tile.
    /// </summary>
    public string ColorHex { get; set; } = string.Empty;

    /// <summary>
    /// Unique code assigned to the color family (e.g., R01, C03).
    /// </summary>
    public string ColorId { get; set; } = string.Empty;

    /// <summary>
    /// Identifier printed on the tile (matches the color identifier).
    /// </summary>
    public string TileId { get; set; } = string.Empty;
}
