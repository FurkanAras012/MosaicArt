using MosaicBuilder.Api.Services.Interfaces;

namespace MosaicBuilder.Api.Services;

/// <summary>
/// Implementation of tile grid calculations
/// </summary>
public class TileService : ITileService
{
    /// <inheritdoc/>
    public (int gridWidth, int gridHeight) CalculateGrid(int imageWidth, int imageHeight, int tileSize)
    {
        if (imageWidth <= 0)
            throw new ArgumentOutOfRangeException(nameof(imageWidth), "Image width must be positive");

        if (imageHeight <= 0)
            throw new ArgumentOutOfRangeException(nameof(imageHeight), "Image height must be positive");

        if (tileSize <= 0)
            throw new ArgumentOutOfRangeException(nameof(tileSize), "Tile size must be positive");

        int gridWidth = (int)Math.Ceiling((double)imageWidth / tileSize);
        int gridHeight = (int)Math.Ceiling((double)imageHeight / tileSize);

        return (gridWidth, gridHeight);
    }
}
