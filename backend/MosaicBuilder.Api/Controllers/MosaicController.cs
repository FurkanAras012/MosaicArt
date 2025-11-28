using Microsoft.AspNetCore.Mvc;
using MosaicBuilder.Api.Models.Requests;
using MosaicBuilder.Api.Models.Responses;
using MosaicBuilder.Api.Models.DTOs;
using MosaicBuilder.Api.Services.Interfaces;

namespace MosaicBuilder.Api.Controllers;

/// <summary>
/// Controller for mosaic processing operations
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class MosaicController : ControllerBase
{
    private readonly IImageService _imageService;
    private readonly ITileService _tileService;
    private readonly IColorService _colorService;
    private readonly IQuantizationService _quantizationService;
    private readonly IRenderService _renderService;
    private readonly ILogger<MosaicController> _logger;

    public MosaicController(
        IImageService imageService,
        ITileService tileService,
        IColorService colorService,
        IQuantizationService quantizationService,
        IRenderService renderService,
        ILogger<MosaicController> logger)
    {
        _imageService = imageService ?? throw new ArgumentNullException(nameof(imageService));
        _tileService = tileService ?? throw new ArgumentNullException(nameof(tileService));
        _colorService = colorService ?? throw new ArgumentNullException(nameof(colorService));
        _quantizationService = quantizationService ?? throw new ArgumentNullException(nameof(quantizationService));
        _renderService = renderService ?? throw new ArgumentNullException(nameof(renderService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    /// <summary>
    /// Processes an image into a mosaic
    /// </summary>
    /// <param name="request">Mosaic processing request</param>
    /// <returns>Mosaic processing response</returns>
    [HttpPost("process")]
    [ProducesResponseType(typeof(MosaicProcessResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<MosaicProcessResponse>> ProcessMosaic([FromBody] MosaicProcessRequest request)
    {
        try
        {
            _logger.LogInformation("Processing mosaic with tile size: {TileSize}, palette type: {PaletteType}",
                request.TileSize, request.PaletteType);

            // Load and validate image
            using var image = await _imageService.LoadFromBase64Async(request.ImageBase64);
            var (imageWidth, imageHeight) = _imageService.GetDimensions(image);

            _logger.LogInformation("Image loaded successfully. Dimensions: {Width}x{Height}", imageWidth, imageHeight);

            // Calculate grid
            var (gridWidth, gridHeight) = _tileService.CalculateGrid(imageWidth, imageHeight, request.TileSize);

            _logger.LogInformation("Grid calculated: {GridWidth}x{GridHeight}", gridWidth, gridHeight);

            // Calculate average colors for each tile
            var tileColors = new List<TileColorDto>();
            var allColors = new List<Models.Entities.Color>();

            for (int y = 0; y < gridHeight; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    int startX = x * request.TileSize;
                    int startY = y * request.TileSize;

                    var avgColor = _colorService.CalculateAverageColor(image, startX, startY, request.TileSize);
                    allColors.Add(avgColor);
                }
            }

            _logger.LogInformation("Average colors calculated for all tiles");

            // Apply color quantization based on palette type
            List<Models.Entities.Color> palette;

            switch (request.PaletteType.ToLowerInvariant())
            {
                case "kmeans":
                    int paletteSize = request.PaletteSize ?? 256; // Default to 256 if not specified
                    palette = _quantizationService.QuantizeToFixedPalette(allColors, paletteSize);
                    _logger.LogInformation("Applied K-Means quantization. Target size: {TargetSize}, Actual size: {ActualSize}", paletteSize, palette.Count);
                    break;

                case "custom":
                    if (request.CustomPalette == null || request.CustomPalette.Count == 0)
                    {
                        return BadRequest("Custom palette is required when palette type is 'custom'");
                    }
                    palette = _quantizationService.ParseCustomPalette(request.CustomPalette);
                    _logger.LogInformation("Applied custom palette. Palette size: {PaletteSize}", palette.Count);
                    break;

                case "dynamic":
                default:
                    palette = allColors.Distinct().ToList();
                    _logger.LogInformation("Using dynamic palette. Palette size: {PaletteSize}", palette.Count);
                    break;
            }

            // Map colors to palette and create tile list
            int tileIndex = 0;
            for (int y = 0; y < gridHeight; y++)
            {
                for (int x = 0; x < gridWidth; x++)
                {
                    var originalColor = allColors[tileIndex++];
                    var mappedColor = request.PaletteType.ToLowerInvariant() == "dynamic"
                        ? originalColor
                        : _colorService.FindClosestColor(originalColor, palette);

                    tileColors.Add(new TileColorDto
                    {
                        X = x,
                        Y = y,
                        Hex = mappedColor.ToHex()
                    });
                }
            }

            // Generate color summary
            var paletteSummary = tileColors
                .GroupBy(t => t.Hex)
                .Select(g => new ColorSummaryDto
                {
                    Hex = g.Key,
                    Count = g.Count()
                })
                .OrderByDescending(s => s.Count)
                .ToList();

            _logger.LogInformation("Color summary generated. Unique colors: {UniqueColors}", paletteSummary.Count);

            // Render mosaic
            using var mosaicImage = await _renderService.RenderMosaicAsync(tileColors, gridWidth, gridHeight, request.TileSize);
            var base64Image = await _renderService.ToBase64Async(mosaicImage);

            _logger.LogInformation("Mosaic rendered successfully");

            var response = new MosaicProcessResponse
            {
                GridWidth = gridWidth,
                GridHeight = gridHeight,
                Colors = tileColors,
                PaletteSummary = paletteSummary,
                RenderImageBase64 = base64Image
            };

            return Ok(response);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Invalid request parameters");
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing mosaic");
            return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing the mosaic");
        }
    }

    /// <summary>
    /// Health check endpoint
    /// </summary>
    [HttpGet("health")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult HealthCheck()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }
}
