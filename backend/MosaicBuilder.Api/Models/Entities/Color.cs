namespace MosaicBuilder.Api.Models.Entities;

/// <summary>
/// Represents an RGB color value
/// </summary>
public record Color(byte R, byte G, byte B)
{
    /// <summary>
    /// Converts the color to hexadecimal format
    /// </summary>
    public string ToHex() => $"#{R:X2}{G:X2}{B:X2}";

    /// <summary>
    /// Creates a Color from hexadecimal string
    /// </summary>
    /// <param name="hex">Hexadecimal color string (with or without #)</param>
    /// <returns>Color instance</returns>
    /// <exception cref="ArgumentException">Thrown when hex format is invalid</exception>
    public static Color FromHex(string hex)
    {
        if (string.IsNullOrWhiteSpace(hex))
            throw new ArgumentException("Hex color cannot be null or empty", nameof(hex));

        hex = hex.TrimStart('#');

        if (hex.Length != 6)
            throw new ArgumentException("Hex color must be 6 characters long", nameof(hex));

        try
        {
            byte r = Convert.ToByte(hex.Substring(0, 2), 16);
            byte g = Convert.ToByte(hex.Substring(2, 2), 16);
            byte b = Convert.ToByte(hex.Substring(4, 2), 16);

            return new Color(r, g, b);
        }
        catch (Exception ex)
        {
            throw new ArgumentException($"Invalid hex color format: {hex}", nameof(hex), ex);
        }
    }

    /// <summary>
    /// Calculates Euclidean distance between two colors
    /// </summary>
    public static double CalculateDistance(Color color1, Color color2)
    {
        return Math.Sqrt(
            Math.Pow(color1.R - color2.R, 2) +
            Math.Pow(color1.G - color2.G, 2) +
            Math.Pow(color1.B - color2.B, 2)
        );
    }
}
