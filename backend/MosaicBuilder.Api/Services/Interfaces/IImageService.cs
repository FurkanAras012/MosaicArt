using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace MosaicBuilder.Api.Services.Interfaces;

/// <summary>
/// Service for image loading and processing operations
/// </summary>
public interface IImageService
{
    /// <summary>
    /// Loads an image from base64 encoded string
    /// </summary>
    /// <param name="base64Data">Base64 encoded image data</param>
    /// <returns>Loaded image</returns>
    Task<Image<Rgba32>> LoadFromBase64Async(string base64Data);

    /// <summary>
    /// Gets the dimensions of an image
    /// </summary>
    /// <param name="image">Source image</param>
    /// <returns>Width and height tuple</returns>
    (int width, int height) GetDimensions(Image<Rgba32> image);

    /// <summary>
    /// Resizes an image if it exceeds maximum dimensions
    /// </summary>
    /// <param name="image">Source image</param>
    /// <param name="maxWidth">Maximum width</param>
    /// <param name="maxHeight">Maximum height</param>
    /// <returns>Resized image</returns>
    Task<Image<Rgba32>> ResizeIfNeededAsync(Image<Rgba32> image, int maxWidth, int maxHeight);
}
