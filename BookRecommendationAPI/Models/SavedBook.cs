namespace BookRecommendationAPI.Models;

public class SavedBook
{
    public string Id { get; set; }
    public string BookId { get; set; } = string.Empty; 
    public string Title { get; set; } = string.Empty;
    public string? Author { get; set; }
    public string Description { get; set; } = string.Empty;
    public DateTime SavedAt { get; set; } = DateTime.UtcNow;
}