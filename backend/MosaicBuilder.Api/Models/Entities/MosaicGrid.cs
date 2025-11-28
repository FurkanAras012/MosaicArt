namespace MosaicBuilder.Api.Models.Entities;

/// <summary>
/// Represents the full mosaic grid and related metadata.
/// </summary>
public class MosaicGrid
{
    /// <summary>
    /// Number of tiles along the X axis.
    /// </summary>
    public int Width { get; set; }

    /// <summary>
    /// Number of tiles along the Y axis.
    /// </summary>
    public int Height { get; set; }

    /// <summary>
    /// Collection of tiles contained in this grid.
    /// </summary>
    public List<Tile> Tiles { get; set; } = new();
}
