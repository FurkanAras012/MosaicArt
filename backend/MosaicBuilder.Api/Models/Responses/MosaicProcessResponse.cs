using MosaicBuilder.Api.Models.DTOs;

namespace MosaicBuilder.Api.Models.Responses;

/// <summary>
/// Response model for mosaic processing
/// </summary>
public class MosaicProcessResponse
{
    /// <summary>
    /// Number of tiles in width
    /// </summary>
    public int GridWidth { get; set; }

    /// <summary>
    /// Number of tiles in height
    /// </summary>
    public int GridHeight { get; set; }

    /// <summary>
    /// List of all tiles with their positions and colors
    /// </summary>
    public List<TileColorDto> Colors { get; set; } = new();

    /// <summary>
    /// Summary of color usage across the mosaic
    /// </summary>
    public List<ColorSummaryDto> PaletteSummary { get; set; } = new();

    /// <summary>
    /// Base64 encoded rendered mosaic image
    /// </summary>
    public string RenderImageBase64 { get; set; } = string.Empty;
}
