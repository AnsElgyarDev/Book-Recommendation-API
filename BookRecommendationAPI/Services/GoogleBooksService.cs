using BookRecommendationAPI.Models; 

namespace BookRecommendationAPI.Services;

public class GoogleBooksService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    
    public GoogleBooksService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _apiKey = configuration["GoogleBooks:ApiKey"] ?? string.Empty;
    }

    public async Task<BookApiResponse?> SearchBooksAsync(string query)
    {
        try
        {
            var url = $"volumes?q={Uri.EscapeDataString(query)}";
            if (!string.IsNullOrEmpty(_apiKey))
            {
                url += $"&key={_apiKey}";
            }

            var result = await _httpClient.GetFromJsonAsync<BookApiResponse>(url);
            return result ?? null!;
        }
        
        catch(Exception ex)
        {
            Console.WriteLine($"Error fetching books: {ex.Message}");
            return null!;            
        }
    }

}