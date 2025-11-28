using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using MosaicBuilder.Api.Models.Entities;

namespace MosaicBuilder.Api.Services.Interfaces;

/// <summary>
/// Service for color calculation and manipulation operations
/// </summary>
public interface IColorService
{
    /// <summary>
    /// Calculates the average color within a rectangular area of an image
    /// </summary>
    /// <param name="image">Source image</param>
    /// <param name="startX">Starting X coordinate</param>
    /// <param name="startY">Starting Y coordinate</param>
    /// <param name="tileSize">Size of the tile</param>
    /// <returns>Average color</returns>
    Models.Entities.Color CalculateAverageColor(Image<Rgba32> image, int startX, int startY, int tileSize);

    /// <summary>
    /// Finds the closest color from a palette to the given color
    /// </summary>
    /// <param name="color">Target color</param>
    /// <param name="palette">Color palette</param>
    /// <returns>Closest color from palette</returns>
    Models.Entities.Color FindClosestColor(Models.Entities.Color color, List<Models.Entities.Color> palette);
}
