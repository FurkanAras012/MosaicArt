namespace MosaicBuilder.Api.Models.DTOs;

/// <summary>
/// Represents a printable panel that contains a subset of tiles.
/// </summary>
public class PanelDto
{
    /// <summary>
    /// Zero-based panel row index.
    /// </summary>
    public int PanelRow { get; set; }

    /// <summary>
    /// Zero-based panel column index.
    /// </summary>
    public int PanelColumn { get; set; }

    /// <summary>
    /// Friendly label for the panel (e.g., Panel A1).
    /// </summary>
    public string Label { get; set; } = string.Empty;

    /// <summary>
    /// Starting row for the panel in the global grid (1-based).
    /// </summary>
    public int StartRow { get; set; }

    /// <summary>
    /// Starting column for the panel in the global grid (1-based).
    /// </summary>
    public int StartColumn { get; set; }

    /// <summary>
    /// Number of tiles horizontally inside this panel.
    /// </summary>
    public int TilesWide { get; set; }

    /// <summary>
    /// Number of tiles vertically inside this panel.
    /// </summary>
    public int TilesHigh { get; set; }

    /// <summary>
    /// Tile list with local coordinates starting from (1,1).
    /// </summary>
    public List<PanelTileDto> Tiles { get; set; } = new();
}
