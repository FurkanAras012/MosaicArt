using MosaicBuilder.Api.Models.DTOs;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace MosaicBuilder.Api.Services.Interfaces;

/// <summary>
/// Service for rendering mosaic images
/// </summary>
public interface IRenderService
{
    /// <summary>
    /// Renders a mosaic image from tile colors
    /// </summary>
    /// <param name="tiles">List of tile colors</param>
    /// <param name="gridWidth">Grid width</param>
    /// <param name="gridHeight">Grid height</param>
    /// <param name="tileSize">Size of each tile</param>
    /// <returns>Rendered image</returns>
    Task<Image<Rgba32>> RenderMosaicAsync(List<TileColorDto> tiles, int gridWidth, int gridHeight, int tileSize);

    /// <summary>
    /// Converts an image to base64 string
    /// </summary>
    /// <param name="image">Source image</param>
    /// <returns>Base64 encoded image string</returns>
    Task<string> ToBase64Async(Image<Rgba32> image);
}
