namespace BookRecommendationAPI.Models;

public class VolumeInfo
{
    public string? Title { get; set; }
    public List<string>? Authors { get; set; }
    public string? Description { get; set; }
    public int? PagesCount { get; set; }
}