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
}
