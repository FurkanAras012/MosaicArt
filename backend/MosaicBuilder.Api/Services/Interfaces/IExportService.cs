using MosaicBuilder.Api.Models.DTOs;
using MosaicBuilder.Api.Models.Entities;

namespace MosaicBuilder.Api.Services.Interfaces;

/// <summary>
/// Service responsible for creating downloadable payloads for grids and tile identifiers.
/// </summary>
public interface IExportService
{
    /// <summary>
    /// Creates a JSON string representing the full grid.
    /// </summary>
    /// <param name="grid">Mosaic grid</param>
    /// <returns>Indented JSON string</returns>
    string BuildGridJson(MosaicGrid grid);

    /// <summary>
    /// Creates a JSON string representing panels.
    /// </summary>
    /// <param name="panels">Panel list</param>
    /// <returns>Indented JSON string</returns>
    string BuildPanelJson(IEnumerable<PanelDto> panels);

    /// <summary>
    /// Creates a CSV export for tile identifiers.
    /// </summary>
    /// <param name="tiles">Tiles to export</param>
    /// <returns>CSV content</returns>
    string BuildTileIdCsv(IEnumerable<Tile> tiles);

    /// <summary>
    /// Creates a JSON export for tile identifiers.
    /// </summary>
    /// <param name="tiles">Tiles to export</param>
    /// <returns>Indented JSON content</returns>
    string BuildTileIdJson(IEnumerable<Tile> tiles);
}
