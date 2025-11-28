using System.Text;
using System.Text.Json;
using System.Linq;
using MosaicBuilder.Api.Models.DTOs;
using MosaicBuilder.Api.Models.Entities;
using MosaicBuilder.Api.Services.Interfaces;

namespace MosaicBuilder.Api.Services;

/// <summary>
/// Implementation of export helpers for grid, panels and tile identifiers.
/// </summary>
public class ExportService : IExportService
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        WriteIndented = true
    };

    /// <inheritdoc/>
    public string BuildGridJson(MosaicGrid grid)
    {
        if (grid == null)
            throw new ArgumentNullException(nameof(grid));

        var payload = new
        {
            grid.Width,
            grid.Height,
            tiles = grid.Tiles.Select(tile => new
            {
                tile.Row,
                tile.Column,
                colorHex = tile.ColorHex,
                colorId = tile.ColorId,
                tileId = tile.TileId
            })
        };

        return JsonSerializer.Serialize(payload, JsonOptions);
    }

    /// <inheritdoc/>
    public string BuildPanelJson(IEnumerable<PanelDto> panels)
    {
        if (panels == null)
            throw new ArgumentNullException(nameof(panels));

        return JsonSerializer.Serialize(panels, JsonOptions);
    }

    /// <inheritdoc/>
    public string BuildTileIdCsv(IEnumerable<Tile> tiles)
    {
        if (tiles == null)
            throw new ArgumentNullException(nameof(tiles));

        var sb = new StringBuilder();
        sb.AppendLine("row,column,colorHex,tileId");

        foreach (var tile in tiles)
        {
            sb.AppendLine(string.Join(',',
                tile.Row,
                tile.Column,
                tile.ColorHex,
                tile.TileId));
        }

        return sb.ToString();
    }

    /// <inheritdoc/>
    public string BuildTileIdJson(IEnumerable<Tile> tiles)
    {
        if (tiles == null)
            throw new ArgumentNullException(nameof(tiles));

        var payload = tiles.Select(tile => new
        {
            tile.Row,
            tile.Column,
            tile.ColorHex,
            tile.TileId,
            tile.ColorId
        });

        return JsonSerializer.Serialize(payload, JsonOptions);
    }
}
