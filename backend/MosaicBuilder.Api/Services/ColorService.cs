using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using MosaicBuilder.Api.Services.Interfaces;

namespace MosaicBuilder.Api.Services;

/// <summary>
/// Implementation of color calculation and manipulation operations
/// </summary>
public class ColorService : IColorService
{
    /// <inheritdoc/>
    public Models.Entities.Color CalculateAverageColor(Image<Rgba32> image, int startX, int startY, int tileSize)
    {
        if (image == null)
            throw new ArgumentNullException(nameof(image));

        if (startX < 0 || startY < 0)
            throw new ArgumentOutOfRangeException("Start coordinates cannot be negative");

        long totalR = 0, totalG = 0, totalB = 0;
        int pixelCount = 0;

        int endX = Math.Min(startX + tileSize, image.Width);
        int endY = Math.Min(startY + tileSize, image.Height);

        for (int y = startY; y < endY; y++)
        {
            for (int x = startX; x < endX; x++)
            {
                var pixel = image[x, y];
                totalR += pixel.R;
                totalG += pixel.G;
                totalB += pixel.B;
                pixelCount++;
            }
        }

        if (pixelCount == 0)
            return new Models.Entities.Color(0, 0, 0);

        byte avgR = (byte)(totalR / pixelCount);
        byte avgG = (byte)(totalG / pixelCount);
        byte avgB = (byte)(totalB / pixelCount);

        return new Models.Entities.Color(avgR, avgG, avgB);
    }

    /// <inheritdoc/>
    public Models.Entities.Color FindClosestColor(Models.Entities.Color color, List<Models.Entities.Color> palette)
    {
        if (palette == null || palette.Count == 0)
            throw new ArgumentException("Palette cannot be null or empty", nameof(palette));

        Models.Entities.Color closestColor = palette[0];
        double minDistance = Models.Entities.Color.CalculateDistance(color, closestColor);

        foreach (var paletteColor in palette.Skip(1))
        {
            double distance = Models.Entities.Color.CalculateDistance(color, paletteColor);
            if (distance < minDistance)
            {
                minDistance = distance;
                closestColor = paletteColor;
            }
        }

        return closestColor;
    }
}
