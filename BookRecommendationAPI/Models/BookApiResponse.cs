using System.Text.Json.Serialization;
namespace BookRecommendationAPI.Models;

public class BookApiResponse
{
    [JsonPropertyName("items")]
    public List<BookItem>? BookItems { get; set; }
}