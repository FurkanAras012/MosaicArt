using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using MosaicBuilder.Api.Services.Interfaces;

namespace MosaicBuilder.Api.Services;

/// <summary>
/// Implementation of image loading and processing operations
/// </summary>
public class ImageService : IImageService
{
    /// <inheritdoc/>
    public async Task<Image<Rgba32>> LoadFromBase64Async(string base64Data)
    {
        if (string.IsNullOrWhiteSpace(base64Data))
            throw new ArgumentException("Base64 data cannot be null or empty", nameof(base64Data));

        try
        {
            // Remove data URI prefix if present
            var base64String = base64Data;
            if (base64Data.Contains(','))
            {
                base64String = base64Data.Split(',')[1];
            }

            var imageBytes = Convert.FromBase64String(base64String);
            using var ms = new MemoryStream(imageBytes);
            return await Image.LoadAsync<Rgba32>(ms).ConfigureAwait(false);
        }
        catch (FormatException ex)
        {
            throw new ArgumentException("Invalid base64 format", nameof(base64Data), ex);
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException("Failed to load image from base64 data", ex);
        }
    }

    /// <inheritdoc/>
    public (int width, int height) GetDimensions(Image<Rgba32> image)
    {
        if (image == null)
            throw new ArgumentNullException(nameof(image));

        return (image.Width, image.Height);
    }

    /// <inheritdoc/>
    public async Task<Image<Rgba32>> ResizeIfNeededAsync(Image<Rgba32> image, int maxWidth, int maxHeight)
    {
        if (image == null)
            throw new ArgumentNullException(nameof(image));

        if (image.Width <= maxWidth && image.Height <= maxHeight)
            return image;

        var ratioX = (double)maxWidth / image.Width;
        var ratioY = (double)maxHeight / image.Height;
        var ratio = Math.Min(ratioX, ratioY);

        var newWidth = (int)(image.Width * ratio);
        var newHeight = (int)(image.Height * ratio);

        image.Mutate(x => x.Resize(newWidth, newHeight));

        return await Task.FromResult(image).ConfigureAwait(false);
    }
}
