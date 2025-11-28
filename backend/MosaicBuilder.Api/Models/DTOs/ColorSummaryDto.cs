namespace MosaicBuilder.Api.Models.DTOs;

/// <summary>
/// Represents a summary of color usage in the mosaic
/// </summary>
public class ColorSummaryDto
{
    /// <summary>
    /// Hexadecimal color value
    /// </summary>
    public string Hex { get; set; } = string.Empty;

    /// <summary>
    /// Number of tiles using this color
    /// </summary>
    public int Count { get; set; }

    /// <summary>
    /// Unique identifier assigned to the color family for labeling.
    /// </summary>
    public string ColorId { get; set; } = string.Empty;
}
