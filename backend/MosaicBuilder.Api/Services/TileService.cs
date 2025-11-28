using System.Collections.Generic;
using System.Linq;
using MosaicBuilder.Api.Models.DTOs;
using MosaicBuilder.Api.Models.Entities;
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

    /// <inheritdoc/>
    public TileSizeInfoDto CalculateTileSize(int tileSize, double? tileWidthCm, double? tileHeightCm, double dpi)
    {
        if (dpi <= 0)
            throw new ArgumentOutOfRangeException(nameof(dpi), "DPI value must be positive");

        double widthCm = tileWidthCm ?? tileHeightCm ?? tileSize * 2.54 / dpi;
        double heightCm = tileHeightCm ?? tileWidthCm ?? tileSize * 2.54 / dpi;

        var widthPx = (int)Math.Round(widthCm * dpi / 2.54d);
        var heightPx = (int)Math.Round(heightCm * dpi / 2.54d);

        int normalizedTileSize = tileSize;
        if (tileWidthCm.HasValue || tileHeightCm.HasValue)
        {
            normalizedTileSize = Math.Max(1, (int)Math.Round((widthPx + heightPx) / 2.0d));
        }

        return new TileSizeInfoDto
        {
            Dpi = dpi,
            TileWidthCm = Math.Round(widthCm, 2),
            TileHeightCm = Math.Round(heightCm, 2),
            TileSizePixels = normalizedTileSize
        };
    }

    /// <inheritdoc/>
    public Dictionary<string, string> GenerateColorCodes(IEnumerable<Color> colors)
    {
        if (colors == null)
            throw new ArgumentNullException(nameof(colors));

        var uniqueColors = colors
            .Select(color => color.ToHex())
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var prefixCounters = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        var codeMap = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        foreach (var hex in uniqueColors)
        {
            var color = Color.FromHex(hex);
            var prefix = GetColorPrefix(color);

            if (!prefixCounters.TryGetValue(prefix, out int counter))
            {
                counter = 0;
            }

            counter++;
            prefixCounters[prefix] = counter;

            codeMap[hex] = $"{prefix}{counter:D2}";
        }

        return codeMap;
    }

    /// <inheritdoc/>
    public MosaicGrid BuildGrid(int gridWidth, int gridHeight, List<TileColorDto> tiles, Dictionary<string, string> colorCodes)
    {
        if (tiles == null)
            throw new ArgumentNullException(nameof(tiles));

        if (colorCodes == null)
            throw new ArgumentNullException(nameof(colorCodes));

        var grid = new MosaicGrid
        {
            Width = gridWidth,
            Height = gridHeight
        };

        foreach (var tile in tiles)
        {
            var colorId = colorCodes.TryGetValue(tile.Hex, out var code)
                ? code
                : "C00";

            grid.Tiles.Add(new Tile
            {
                X = tile.X,
                Y = tile.Y,
                Column = tile.X + 1,
                Row = tile.Y + 1,
                ColorHex = tile.Hex,
                ColorId = colorId,
                TileId = colorId
            });
        }

        return grid;
    }

    /// <inheritdoc/>
    public List<PanelDto> BuildPanels(MosaicGrid grid, double? panelWidthCm, double? panelHeightCm, double dpi, int tileSize)
    {
        if (grid == null)
            throw new ArgumentNullException(nameof(grid));

        if (tileSize <= 0)
            throw new ArgumentOutOfRangeException(nameof(tileSize), "Tile size must be positive");

        // If no panel data provided, return a single panel with everything inside
        if (!panelWidthCm.HasValue || !panelHeightCm.HasValue)
        {
            return new List<PanelDto>
            {
                new PanelDto
                {
                    PanelRow = 0,
                    PanelColumn = 0,
                    Label = "Panel A1",
                    StartRow = 1,
                    StartColumn = 1,
                    TilesWide = grid.Width,
                    TilesHigh = grid.Height,
                    Tiles = grid.Tiles.Select(tile => new PanelTileDto
                    {
                        LocalRow = tile.Row,
                        LocalColumn = tile.Column,
                        GlobalRow = tile.Row,
                        GlobalColumn = tile.Column,
                        ColorHex = tile.ColorHex,
                        ColorId = tile.ColorId,
                        TileId = tile.TileId
                    }).ToList()
                }
            };
        }

        var tilesPerPanelX = Math.Max(1, (int)Math.Floor(panelWidthCm.Value * dpi / 2.54d / tileSize));
        var tilesPerPanelY = Math.Max(1, (int)Math.Floor(panelHeightCm.Value * dpi / 2.54d / tileSize));

        var panelCountX = (int)Math.Ceiling((double)grid.Width / tilesPerPanelX);
        var panelCountY = (int)Math.Ceiling((double)grid.Height / tilesPerPanelY);

        var panels = new List<PanelDto>();

        for (int panelRow = 0; panelRow < panelCountY; panelRow++)
        {
            for (int panelCol = 0; panelCol < panelCountX; panelCol++)
            {
                int startColumn = panelCol * tilesPerPanelX + 1;
                int startRow = panelRow * tilesPerPanelY + 1;

                int endColumn = Math.Min(startColumn + tilesPerPanelX - 1, grid.Width);
                int endRow = Math.Min(startRow + tilesPerPanelY - 1, grid.Height);

                var panelTiles = grid.Tiles
                    .Where(tile => tile.Column >= startColumn && tile.Column <= endColumn && tile.Row >= startRow && tile.Row <= endRow)
                    .Select(tile => new PanelTileDto
                    {
                        LocalRow = tile.Row - startRow + 1,
                        LocalColumn = tile.Column - startColumn + 1,
                        GlobalRow = tile.Row,
                        GlobalColumn = tile.Column,
                        ColorHex = tile.ColorHex,
                        ColorId = tile.ColorId,
                        TileId = tile.TileId
                    })
                    .ToList();

                var label = $"Panel {(char)('A' + panelRow)}{panelCol + 1}";

                panels.Add(new PanelDto
                {
                    PanelRow = panelRow,
                    PanelColumn = panelCol,
                    Label = label,
                    StartRow = startRow,
                    StartColumn = startColumn,
                    TilesWide = endColumn - startColumn + 1,
                    TilesHigh = endRow - startRow + 1,
                    Tiles = panelTiles
                });
            }
        }

        return panels;
    }

    private static string GetColorPrefix(Color color)
    {
        // Convert RGB to HSV to decide prefix buckets
        double r = color.R / 255.0d;
        double g = color.G / 255.0d;
        double b = color.B / 255.0d;

        double max = Math.Max(r, Math.Max(g, b));
        double min = Math.Min(r, Math.Min(g, b));
        double delta = max - min;

        if (delta < 0.01 && max < 0.2)
            return "K"; // near black

        double hue;
        if (delta == 0)
        {
            hue = 0;
        }
        else if (max == r)
        {
            hue = 60 * (((g - b) / delta) % 6);
        }
        else if (max == g)
        {
            hue = 60 * (((b - r) / delta) + 2);
        }
        else
        {
            hue = 60 * (((r - g) / delta) + 4);
        }

        if (hue < 0)
        {
            hue += 360;
        }

        if (delta < 0.05 && max > 0.8)
            return "W"; // near white

        if (hue < 30 || hue >= 330)
            return "R"; // red
        if (hue < 90)
            return "Y"; // yellow-green band
        if (hue < 150)
            return "G"; // green
        if (hue < 210)
            return "C"; // cyan
        if (hue < 270)
            return "B"; // blue
        if (hue < 330)
            return "M"; // magenta

        return "C";
    }
}
