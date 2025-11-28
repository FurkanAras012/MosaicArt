using MosaicBuilder.Api.Models.Entities;

namespace MosaicBuilder.Api.Services.Interfaces;

/// <summary>
/// Service for color quantization operations
/// </summary>
public interface IQuantizationService
{
    /// <summary>
    /// Quantizes colors to a fixed palette using K-Means clustering
    /// </summary>
    /// <param name="colors">List of colors to quantize</param>
    /// <param name="paletteSize">Desired palette size (default 256)</param>
    /// <returns>Quantized palette</returns>
    List<Models.Entities.Color> QuantizeToFixedPalette(List<Models.Entities.Color> colors, int paletteSize = 256);

    /// <summary>
    /// Validates and parses custom color palette from hex strings
    /// </summary>
    /// <param name="hexColors">List of hexadecimal color strings</param>
    /// <returns>Parsed color palette</returns>
    List<Models.Entities.Color> ParseCustomPalette(List<string> hexColors);
}
