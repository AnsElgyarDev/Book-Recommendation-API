using System.Text.Json.Serialization;
namespace BookRecommendationAPI.Models;

public class BookItem
{
    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("volumeInfo")]
    public VolumeInfo? VolumeInfo { get; set; }
}