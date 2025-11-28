namespace MosaicBuilder.Api.Models.DTOs;

/// <summary>
/// Represents tile sizing metadata in both physical and pixel dimensions.
/// </summary>
public class TileSizeInfoDto
{
    /// <summary>
    /// Dots per inch value extracted from the source image metadata.
    /// </summary>
    public double Dpi { get; set; }

    /// <summary>
    /// Calculated tile width in centimeters.
    /// </summary>
    public double TileWidthCm { get; set; }

    /// <summary>
    /// Calculated tile height in centimeters.
    /// </summary>
    public double TileHeightCm { get; set; }

    /// <summary>
    /// Calculated tile size in pixels (square tiles enforced for rendering).
    /// </summary>
    public int TileSizePixels { get; set; }
}
