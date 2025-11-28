# 🏗️ MosaicBuilder Backend Yapısı ve Kuralları
*Katı kod standartları ve mimarisi kuralları - Bu kurallar dışına çıkılması YASAKTIR*

---

## 📁 Klasör Yapısı (ZORUNLU)

```
/MosaicBuilder.Api
├── Controllers/
│   └── MosaicController.cs                    # SADECE 1 controller
├── Services/
│   ├── Interfaces/                            # Tüm interface'ler burada
│   │   ├── IImageService.cs
│   │   ├── ITileService.cs
│   │   ├── IColorService.cs
│   │   ├── IQuantizationService.cs
│   │   ├── IRenderService.cs
│   │   └── IExportService.cs
│   ├── ImageService.cs                        # Görsel işleme
│   ├── TileService.cs                         # Grid hesaplamaları
│   ├── ColorService.cs                        # Renk işlemleri
│   ├── QuantizationService.cs                 # Renk azaltma algoritmaları
│   ├── RenderService.cs                       # Mozaik render
│   └── ExportService.cs                       # Export işlemleri
├── Models/
│   ├── Requests/                              # API request modelleri
│   │   └── MosaicProcessRequest.cs
│   ├── Responses/                             # API response modelleri
│   │   └── MosaicProcessResponse.cs
│   ├── DTOs/                                  # Data Transfer Objects
│   │   ├── TileColorDto.cs
│   │   ├── ColorSummaryDto.cs
│   │   └── GridInfoDto.cs
│   └── Entities/                              # Domain modelleri
│       ├── Color.cs
│       ├── Tile.cs
│       └── MosaicGrid.cs
├── Helpers/
│   ├── ColorHelper.cs                         # Renk dönüştürme utilities
│   ├── ValidationHelper.cs                    # Validation logic
│   └── ImageHelper.cs                         # Image utilities
├── Middleware/
│   ├── ExceptionHandlingMiddleware.cs         # Global exception handling
│   └── RequestLoggingMiddleware.cs            # Request/Response logging
├── Extensions/
│   ├── ServiceExtensions.cs                   # DI container extensions
│   └── ImageExtensions.cs                     # Image processing extensions
├── Constants/
│   ├── ApiConstants.cs                        # API sabitler
│   ├── ColorConstants.cs                      # Renk sabitler
│   └── ValidationConstants.cs                 # Validation sabitler
├── Configurations/
│   └── ApiConfiguration.cs                    # API ayarları
├── Program.cs                                 # Entry point
└── appsettings.json                          # Configuration
```

---

## 🎯 Naming Conventions (KESIN KURALLAR)

### Genel Kurallar
- **PascalCase**: Sınıflar, metodlar, properties `ImageService`, `ProcessMosaic()`
- **camelCase**: Local değişkenler, parametreler `tileSize`, `imageData`
- **UPPER_SNAKE_CASE**: Constants `MAX_TILE_SIZE`, `DEFAULT_PALETTE_SIZE`
- **Interface prefix**: Tüm interface'ler `I` ile başlar `IImageService`

### Service Naming
- Service sınıfları `Service` suffix ile biter: `ImageService`
- Service metodları verb ile başlar: `ProcessImage()`, `CalculateGrid()`
- Async metodlar `Async` suffix: `ProcessImageAsync()`

### Model Naming
- Request modelleri `Request` suffix: `MosaicProcessRequest`
- Response modelleri `Response` suffix: `MosaicProcessResponse`
- DTO'lar `Dto` suffix: `TileColorDto`
- Entity'ler suffix YOK: `Color`, `Tile`

---

## 🏛️ Dependency Injection Kuralları

### Service Registration (Program.cs)
```csharp
// ✅ DOGRU - Interface ile registration
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<ITileService, TileService>();
builder.Services.AddScoped<IColorService, ColorService>();

// ❌ YANLIŞ - Concrete class registration
builder.Services.AddScoped<ImageService>();
```

### Constructor Injection
```csharp
// ✅ DOGRU - Interface dependency
public class MosaicController : ControllerBase
{
    private readonly IImageService _imageService;
    private readonly ITileService _tileService;
    
    public MosaicController(IImageService imageService, ITileService tileService)
    {
        _imageService = imageService ?? throw new ArgumentNullException(nameof(imageService));
        _tileService = tileService ?? throw new ArgumentNullException(nameof(tileService));
    }
}

// ❌ YANLIŞ - Concrete class dependency
public MosaicController(ImageService imageService) // YASAK!
```

---

## 📋 Controller Kuralları

### Single Responsibility
- **KURAL**: Sadece 1 controller olacak: `MosaicController`
- **KURAL**: Controller sadece HTTP işlemleri yapar, business logic YOK

```csharp
[ApiController]
[Route("api/[controller]")]
public class MosaicController : ControllerBase
{
    // ✅ DOGRU - Sadece orchestration
    [HttpPost("process")]
    public async Task<ActionResult<MosaicProcessResponse>> ProcessMosaic(
        [FromBody] MosaicProcessRequest request)
    {
        try
        {
            var result = await _mosaicService.ProcessAsync(request);
            return Ok(result);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
    }
    
    // ❌ YANLIŞ - Business logic controller'da
    [HttpPost("process")]
    public async Task<ActionResult> ProcessMosaic(MosaicProcessRequest request)
    {
        // Renk hesaplama logic burada YASAK!
        var avgColor = CalculateAverageColor(image); // YASAK!
    }
}
```

### HTTP Status Codes (ZORUNLU)
- **200 OK**: Başarılı işlem
- **400 Bad Request**: Validation hatası
- **422 Unprocessable Entity**: Business rule ihlali
- **500 Internal Server Error**: Sistem hatası

---

## 🔧 Service Layer Kuralları

### Interface Design
```csharp
// ✅ DOGRU - Clear interface definition
public interface IImageService
{
    Task<Image> LoadFromBase64Async(string base64Data);
    (int width, int height) GetDimensions(Image image);
    Task<Image> ResizeAsync(Image image, int maxWidth, int maxHeight);
}

// ❌ YANLIŞ - Generic/unclear methods
public interface IImageService
{
    Task<object> Process(object data); // YASAK!
    Task<dynamic> DoSomething(string input); // YASAK!
}
```

### Service Implementation
```csharp
// ✅ DOGRU - Single responsibility, clear methods
public class ColorService : IColorService
{
    public Color CalculateAverageColor(Image image, Rectangle area)
    {
        // Single responsibility: sadece renk hesaplama
        var pixels = GetPixelsInArea(image, area);
        return CalculateAverage(pixels);
    }
    
    public double CalculateDistance(Color color1, Color color2)
    {
        // Euclidean distance calculation
        return Math.Sqrt(
            Math.Pow(color1.R - color2.R, 2) +
            Math.Pow(color1.G - color2.G, 2) +
            Math.Pow(color1.B - color2.B, 2)
        );
    }
}

// ❌ YANLIŞ - Multiple responsibilities
public class ColorService : IColorService
{
    public Color CalculateAverageColor(Image image)
    {
        // ❌ File I/O logic here - YASAK!
        var filePath = SaveImageToFile(image); 
        
        // ❌ Render logic here - YASAK!
        var canvas = CreateCanvas();
        
        return color;
    }
}
```

### Async/Await Kuralları
```csharp
// ✅ DOGRU - Consistent async pattern
public async Task<MosaicProcessResponse> ProcessAsync(MosaicProcessRequest request)
{
    var image = await _imageService.LoadFromBase64Async(request.ImageBase64);
    var colors = await _colorService.CalculateColorsAsync(image, request.TileSize);
    return await _renderService.RenderMosaicAsync(colors);
}

// ❌ YANLIŞ - Mixed sync/async
public MosaicProcessResponse Process(MosaicProcessRequest request) // YASAK sync method!
{
    var image = _imageService.LoadFromBase64Async(request.ImageBase64).Result; // YASAK!
    return response;
}
```

---

## 📊 Model ve DTO Kuralları

### Request/Response Models
```csharp
// ✅ DOGRU - Clear, validated models
public class MosaicProcessRequest
{
    [Required]
    [StringLength(10485760)] // 10MB base64 limit
    public string ImageBase64 { get; set; }
    
    [Range(1, 1000)]
    public int TileSize { get; set; }
    
    [Required]
    [RegularExpression("^(dynamic|fixed256|custom)$")]
    public string PaletteType { get; set; }
    
    [ValidateHexColors] // Custom validation attribute
    public List<string>? CustomPalette { get; set; }
}

// ❌ YANLIŞ - No validation, unclear types
public class MosaicProcessRequest
{
    public object Data { get; set; } // YASAK!
    public string Settings { get; set; } // YASAK - belirsiz!
    public dynamic Config { get; set; } // YASAK!
}
```

### Entity Models
```csharp
// ✅ DOGRU - Immutable, value objects
public record Color(byte R, byte G, byte B)
{
    public string ToHex() => $"#{R:X2}{G:X2}{B:X2}";
    
    public static Color FromHex(string hex)
    {
        // Validation ve parsing logic
        if (!IsValidHex(hex))
            throw new ArgumentException("Invalid hex color", nameof(hex));
            
        return new Color(/* parse logic */);
    }
}

// ❌ YANLIŞ - Mutable, no validation
public class Color
{
    public int R { get; set; } // YASAK - validation yok!
    public int G { get; set; }
    public int B { get; set; }
    
    // Method yok, behavior yok - YASAK anemic model!
}
```

---

## 🔒 Error Handling Kuralları

### Exception Hierarchy
```csharp
// ✅ DOGRU - Custom exception hierarchy
public abstract class MosaicException : Exception
{
    public MosaicException(string message) : base(message) { }
    public MosaicException(string message, Exception innerException) : base(message, innerException) { }
}

public class InvalidImageException : MosaicException
{
    public InvalidImageException(string message) : base(message) { }
}

public class TileSizeException : MosaicException
{
    public TileSizeException(int tileSize) : base($"Invalid tile size: {tileSize}") { }
}
```

### Exception Handling
```csharp
// ✅ DOGRU - Specific exception handling
public async Task<Image> LoadFromBase64Async(string base64Data)
{
    try
    {
        var imageBytes = Convert.FromBase64String(base64Data);
        return await Image.LoadAsync(imageBytes);
    }
    catch (FormatException ex)
    {
        throw new InvalidImageException("Invalid base64 format", ex);
    }
    catch (ArgumentException ex)
    {
        throw new InvalidImageException("Invalid image data", ex);
    }
}

// ❌ YANLIŞ - Generic exception handling
public async Task<Image> LoadFromBase64Async(string base64Data)
{
    try
    {
        // logic
    }
    catch (Exception ex) // YASAK - too generic!
    {
        throw; // YASAK - information loss!
    }
}
```

---

## 🧪 Testing Kuralları

### Unit Test Structure
```csharp
// ✅ DOGRU - AAA pattern (Arrange, Act, Assert)
[TestClass]
public class ColorServiceTests
{
    private readonly IColorService _colorService;
    
    public ColorServiceTests()
    {
        _colorService = new ColorService();
    }
    
    [TestMethod]
    public void CalculateAverageColor_WithValidImage_ReturnsCorrectAverage()
    {
        // Arrange
        var image = CreateTestImage(Color.Red, Color.Blue);
        var area = new Rectangle(0, 0, 2, 1);
        var expectedColor = Color.Purple; // Red + Blue average
        
        // Act
        var result = _colorService.CalculateAverageColor(image, area);
        
        // Assert
        Assert.AreEqual(expectedColor.R, result.R, 1); // 1 tolerance
        Assert.AreEqual(expectedColor.G, result.G, 1);
        Assert.AreEqual(expectedColor.B, result.B, 1);
    }
}

// ❌ YANLIŞ - Poor test structure
[TestMethod]
public void TestColorService() // YASAK - belirsiz test adı!
{
    var service = new ColorService();
    var result = service.CalculateAverageColor(null); // YASAK - null test!
    // Assert yok - YASAK!
}
```

---

## 📝 Documentation Kuralları

### XML Documentation (ZORUNLU)
```csharp
/// <summary>
/// Calculates the average color of pixels within the specified rectangular area of an image.
/// </summary>
/// <param name="image">The source image to analyze. Must not be null.</param>
/// <param name="area">The rectangular area within the image to calculate average for.</param>
/// <returns>A Color object representing the average RGB values of the specified area.</returns>
/// <exception cref="ArgumentNullException">Thrown when image is null.</exception>
/// <exception cref="ArgumentOutOfRangeException">Thrown when area is outside image bounds.</exception>
public Color CalculateAverageColor(Image image, Rectangle area)
{
    // Implementation
}

// ❌ YANLIŞ - Documentation yok
public Color CalculateAverageColor(Image image, Rectangle area) // YASAK - doc yok!
{
    // Implementation
}
```

---

## 🚀 Performance Kuralları

### Memory Management
```csharp
// ✅ DOGRU - Proper disposal
public async Task<Image> ProcessImageAsync(string base64Data)
{
    using var imageBytes = Convert.FromBase64String(base64Data);
    using var image = await Image.LoadAsync(imageBytes);
    
    // Process image
    return ProcessedImage;
}

// ❌ YANLIŞ - Memory leak risk
public async Task<Image> ProcessImageAsync(string base64Data)
{
    var image = await Image.LoadAsync(base64Data); // YASAK - no disposal!
    return image; // Memory leak risk!
}
```

### Async Best Practices
```csharp
// ✅ DOGRU - ConfigureAwait(false)
public async Task<List<Color>> CalculateColorsAsync(Image image)
{
    var tasks = tiles.Select(tile => 
        ProcessTileAsync(tile).ConfigureAwait(false));
    
    return await Task.WhenAll(tasks).ConfigureAwait(false);
}

// ❌ YANLIŞ - Default ConfigureAwait
public async Task<List<Color>> CalculateColorsAsync(Image image)
{
    return await ProcessTileAsync(tile); // YASAK - deadlock riski!
}
```

---

## 🔧 Configuration Kuralları

### appsettings.json Structure
```json
{
  "MosaicSettings": {
    "MaxImageSizeMB": 10,
    "MaxTileSize": 1000,
    "MinTileSize": 1,
    "DefaultPaletteSize": 256,
    "MaxProcessingTimeSeconds": 300
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "MosaicBuilder": "Debug"
    }
  }
}
```

---

## ❌ YASAKLI PRATIKLER

1. **Static Classes**: Service'ler static OLAMAZ
2. **God Classes**: 500+ satır sınıf YASAK
3. **Deep Nesting**: 3+ seviye nested if YASAK
4. **Magic Numbers**: Hard-coded sayılar YASAK
5. **Var Overuse**: Belirsiz türler için var YASAK
6. **Catch All**: Generic Exception catch YASAK
7. **Async Void**: Sadece event handler'da kullanılır
8. **Result on Async**: `.Result` veya `.Wait()` YASAK

---

**Bu kurallar production-ready, maintainable ve scalable backend kod için ZORUNLUDUR. Hiçbir istisnaya izin verilmez!**