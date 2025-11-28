namespace MosaicBuilder.Api.Models.DTOs;

/// <summary>
/// Represents a single tile's position and color
/// </summary>
public class TileColorDto
{
    /// <summary>
    /// X coordinate in the grid
    /// </summary>
    public int X { get; set; }

    /// <summary>
    /// Y coordinate in the grid
    /// </summary>
    public int Y { get; set; }

    /// <summary>
    /// Hexadecimal color value
    /// </summary>
    public string Hex { get; set; } = string.Empty;

    /// <summary>
    /// One-based column index for export readability.
    /// </summary>
    public int Column { get; set; }

    /// <summary>
    /// One-based row index for export readability.
    /// </summary>
    public int Row { get; set; }

    /// <summary>
    /// Identifier assigned to the color family.
    /// </summary>
    public string ColorId { get; set; } = string.Empty;

    /// <summary>
    /// Identifier printed on the tile (mirrors the color identifier for production labels).
    /// </summary>
    public string TileId { get; set; } = string.Empty;
}
