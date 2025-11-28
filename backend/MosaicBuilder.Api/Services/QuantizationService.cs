using MosaicBuilder.Api.Services.Interfaces;

namespace MosaicBuilder.Api.Services;

/// <summary>
/// Implementation of color quantization operations
/// </summary>
public class QuantizationService : IQuantizationService
{
    /// <inheritdoc/>
    public List<Models.Entities.Color> QuantizeToFixedPalette(List<Models.Entities.Color> colors, int paletteSize = 256)
    {
        if (colors == null || colors.Count == 0)
            throw new ArgumentException("Colors list cannot be null or empty", nameof(colors));

        if (paletteSize <= 0)
            throw new ArgumentOutOfRangeException(nameof(paletteSize), "Palette size must be positive");

        if (colors.Count <= paletteSize)
            return colors.Distinct().ToList();

        // K-Means clustering implementation
        var random = new Random(42); // Fixed seed for reproducibility
        var centroids = colors.OrderBy(x => random.Next()).Take(paletteSize).ToList();
        var clusters = new List<Models.Entities.Color>[paletteSize];

        const int maxIterations = 20;
        bool changed = true;
        int iteration = 0;

        while (changed && iteration < maxIterations)
        {
            changed = false;
            iteration++;

            // Initialize clusters
            for (int i = 0; i < paletteSize; i++)
            {
                clusters[i] = new List<Models.Entities.Color>();
            }

            // Assign colors to nearest centroid
            foreach (var color in colors)
            {
                int nearestCentroidIndex = 0;
                double minDistance = Models.Entities.Color.CalculateDistance(color, centroids[0]);

                for (int i = 1; i < centroids.Count; i++)
                {
                    double distance = Models.Entities.Color.CalculateDistance(color, centroids[i]);
                    if (distance < minDistance)
                    {
                        minDistance = distance;
                        nearestCentroidIndex = i;
                    }
                }

                clusters[nearestCentroidIndex].Add(color);
            }

            // Recalculate centroids
            for (int i = 0; i < paletteSize; i++)
            {
                if (clusters[i].Count > 0)
                {
                    byte avgR = (byte)clusters[i].Average(c => c.R);
                    byte avgG = (byte)clusters[i].Average(c => c.G);
                    byte avgB = (byte)clusters[i].Average(c => c.B);

                    var newCentroid = new Models.Entities.Color(avgR, avgG, avgB);
                    if (!newCentroid.Equals(centroids[i]))
                    {
                        centroids[i] = newCentroid;
                        changed = true;
                    }
                }
            }
        }

        return centroids.Distinct().ToList();
    }

    /// <inheritdoc/>
    public List<Models.Entities.Color> ParseCustomPalette(List<string> hexColors)
    {
        if (hexColors == null || hexColors.Count == 0)
            throw new ArgumentException("Hex colors list cannot be null or empty", nameof(hexColors));

        var palette = new List<Models.Entities.Color>();

        foreach (var hex in hexColors)
        {
            try
            {
                var color = Models.Entities.Color.FromHex(hex);
                palette.Add(color);
            }
            catch (Exception ex)
            {
                throw new ArgumentException($"Invalid hex color in custom palette: {hex}", nameof(hexColors), ex);
            }
        }

        return palette.Distinct().ToList();
    }
}
