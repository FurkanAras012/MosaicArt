namespace MosaicBuilder.Api.Models.DTOs;

/// <summary>
/// Represents pre-generated export payloads for tiles and panels.
/// </summary>
public class TileExportDto
{
    /// <summary>
    /// JSON export for the full grid with coordinates and identifiers.
    /// </summary>
    public string GridJson { get; set; } = string.Empty;

    /// <summary>
    /// JSON export for panel breakdowns.
    /// </summary>
    public string PanelsJson { get; set; } = string.Empty;

    /// <summary>
    /// CSV export for tile identifiers.
    /// </summary>
    public string TileIdCsv { get; set; } = string.Empty;

    /// <summary>
    /// JSON export for tile identifiers.
    /// </summary>
    public string TileIdJson { get; set; } = string.Empty;
}
