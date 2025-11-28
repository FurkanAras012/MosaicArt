using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Formats.Png;
using MosaicBuilder.Api.Services.Interfaces;
using MosaicBuilder.Api.Models.DTOs;

namespace MosaicBuilder.Api.Services;

/// <summary>
/// Implementation of mosaic rendering operations
/// </summary>
public class RenderService : IRenderService
{
    /// <inheritdoc/>
    public async Task<Image<Rgba32>> RenderMosaicAsync(List<TileColorDto> tiles, int gridWidth, int gridHeight, int tileSize)
    {
        if (tiles == null || tiles.Count == 0)
            throw new ArgumentException("Tiles list cannot be null or empty", nameof(tiles));

        if (gridWidth <= 0 || gridHeight <= 0)
            throw new ArgumentException("Grid dimensions must be positive");

        if (tileSize <= 0)
            throw new ArgumentOutOfRangeException(nameof(tileSize), "Tile size must be positive");

        int width = gridWidth * tileSize;
        int height = gridHeight * tileSize;

        var image = new Image<Rgba32>(width, height);

        foreach (var tile in tiles)
        {
            try
            {
                var color = Models.Entities.Color.FromHex(tile.Hex);
                var pixelColor = new Rgba32(color.R, color.G, color.B);

                int startX = tile.X * tileSize;
                int startY = tile.Y * tileSize;
                int endX = Math.Min(startX + tileSize, width);
                int endY = Math.Min(startY + tileSize, height);

                for (int y = startY; y < endY; y++)
                {
                    for (int x = startX; x < endX; x++)
                    {
                        image[x, y] = pixelColor;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to render tile at ({tile.X}, {tile.Y})", ex);
            }
        }

        return await Task.FromResult(image).ConfigureAwait(false);
    }

    /// <inheritdoc/>
    public async Task<string> ToBase64Async(Image<Rgba32> image)
    {
        if (image == null)
            throw new ArgumentNullException(nameof(image));

        using var ms = new MemoryStream();
        await image.SaveAsPngAsync(ms).ConfigureAwait(false);
        var bytes = ms.ToArray();
        return $"data:image/png;base64,{Convert.ToBase64String(bytes)}";
    }
}
