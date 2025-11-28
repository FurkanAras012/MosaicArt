namespace MosaicBuilder.Api.Services.Interfaces;

/// <summary>
/// Service for tile grid calculations
/// </summary>
public interface ITileService
{
    /// <summary>
    /// Calculates grid dimensions based on image size and tile size
    /// </summary>
    /// <param name="imageWidth">Image width in pixels</param>
    /// <param name="imageHeight">Image height in pixels</param>
    /// <param name="tileSize">Tile size in pixels</param>
    /// <returns>Grid width and height</returns>
    (int gridWidth, int gridHeight) CalculateGrid(int imageWidth, int imageHeight, int tileSize);
}
