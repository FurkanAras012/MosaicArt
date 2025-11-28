using System.ComponentModel.DataAnnotations;

namespace MosaicBuilder.Api.Models.Requests;

/// <summary>
/// Request model for mosaic processing
/// </summary>
public class MosaicProcessRequest
{
    /// <summary>
    /// Base64 encoded image data
    /// </summary>
    [Required(ErrorMessage = "Image data is required")]
    [StringLength(10485760, ErrorMessage = "Image data exceeds 10MB limit")]
    public string ImageBase64 { get; set; } = string.Empty;

    /// <summary>
    /// Size of each tile in pixels
    /// </summary>
    [Range(1, 1000, ErrorMessage = "Tile size must be between 1 and 1000 pixels")]
    public int TileSize { get; set; }

    /// <summary>
    /// Type of palette to use: "dynamic", "kmeans", or "custom"
    /// </summary>
    [Required(ErrorMessage = "Palette type is required")]
    [RegularExpression("^(dynamic|kmeans|custom)$", ErrorMessage = "Invalid palette type")]
    public string PaletteType { get; set; } = "dynamic";

    /// <summary>
    /// Size of palette for K-Means clustering (16-512)
    /// </summary>
    [Range(16, 512, ErrorMessage = "Palette size must be between 16 and 512")]
    public int? PaletteSize { get; set; }

    /// <summary>
    /// Custom color palette (hex values) - required when PaletteType is "custom"
    /// </summary>
    public List<string>? CustomPalette { get; set; }

    /// <summary>
    /// Desired width in centimeters (optional)
    /// </summary>
    [Range(1, 10000, ErrorMessage = "Desired width must be between 1 and 10000 cm")]
    public int? DesiredWidthCm { get; set; }

    /// <summary>
    /// Desired height in centimeters (optional)
    /// </summary>
    [Range(1, 10000, ErrorMessage = "Desired height must be between 1 and 10000 cm")]
    public int? DesiredHeightCm { get; set; }
}
