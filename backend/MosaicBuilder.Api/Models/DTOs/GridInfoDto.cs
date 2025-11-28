namespace MosaicBuilder.Api.Models.DTOs;

/// <summary>
/// Represents the full grid matrix including coordinates and identifiers.
/// </summary>
public class GridInfoDto
{
    /// <summary>
    /// Total columns in the grid.
    /// </summary>
    public int GridWidth { get; set; }

    /// <summary>
    /// Total rows in the grid.
    /// </summary>
    public int GridHeight { get; set; }

    /// <summary>
    /// Flattened tile list that includes coordinates, hex value and identifiers.
    /// </summary>
    public List<TileColorDto> Tiles { get; set; } = new();
}
