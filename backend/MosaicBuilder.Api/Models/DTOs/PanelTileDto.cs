namespace MosaicBuilder.Api.Models.DTOs;

/// <summary>
/// Represents a tile within a panel with both global and local coordinates.
/// </summary>
public class PanelTileDto
{
    /// <summary>
    /// Local row index inside the panel (1-based).
    /// </summary>
    public int LocalRow { get; set; }

    /// <summary>
    /// Local column index inside the panel (1-based).
    /// </summary>
    public int LocalColumn { get; set; }

    /// <summary>
    /// Global row index inside the full grid (1-based).
    /// </summary>
    public int GlobalRow { get; set; }

    /// <summary>
    /// Global column index inside the full grid (1-based).
    /// </summary>
    public int GlobalColumn { get; set; }

    /// <summary>
    /// Hexadecimal color value.
    /// </summary>
    public string ColorHex { get; set; } = string.Empty;

    /// <summary>
    /// Identifier assigned to the color family.
    /// </summary>
    public string ColorId { get; set; } = string.Empty;

    /// <summary>
    /// Identifier printed on the tile.
    /// </summary>
    public string TileId { get; set; } = string.Empty;
}
