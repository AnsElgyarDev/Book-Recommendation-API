using BookRecommendationAPI.Models; 

namespace BookRecommendationAPI.Services;

public class GoogleBooksService
{
    private readonly HttpClient _httpClient;
    
    public GoogleBooksService(HttpClient httpClient)
    {
        this._httpClient = httpClient;
    }

    public async Task<BookApiResponse>? SearchBooksAsync(string query)
    {
        try
        {
            var result = await _httpClient.GetFromJsonAsync<BookApiResponse>($"volumes?q={Uri.EscapeDataString(query)}");
            return result ?? null!;
        }

        catch(Exception ex)
        {
            Console.WriteLine($"Error fetching books: {ex.Message}");
            return null!;            
        }
    }

}