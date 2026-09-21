namespace BookRecommendationAPI.Models;

public class SavedBook
{
    public int Id { get; set; }
    public string BookId { get; set; } = string.Empty; 
    public string Title { get; set; } = string.Empty;
    public string? Author { get; set; }
    public DateTime SavedAt { get; set; } = DateTime.UtcNow;
}