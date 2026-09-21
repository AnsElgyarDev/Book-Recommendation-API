using BookRecommendationAPI.Data;
using Microsoft.EntityFrameworkCore;
using BookRecommendationAPI.Models; 

namespace BookRecommendationAPI.Services;

public class GoogleBooksService
{
    private readonly HttpClient _httpClient;
    private readonly AppDbContext _context;
    private readonly string _apiKey;
    
    public GoogleBooksService(HttpClient httpClient, IConfiguration configuration, AppDbContext context)
    {
        this._httpClient = httpClient;
        this._apiKey = configuration["GoogleBooks:ApiKey"] ?? string.Empty;
        this._context = context;
    }

    public async Task<BookApiResponse?> SearchBooksAsync(string query)
    {
        try
        {
            var exist = await _context.SavedBooks.AnyAsync<SavedBook>(book => book.Title == query);
            
            if(exist)
            {
                Console.WriteLine("Came From Database!");

                var book = await _context.SavedBooks.FirstOrDefaultAsync(book => book.Title == query);
                
                var BookApiResponse =  new BookApiResponse 
                {
                    BookItems = new List<BookItem>() 
                    {
                        new BookItem 
                        {
                            Id = book.Id,
                            VolumeInfo = new VolumeInfo
                            {
                                Title = book.Title,
                                Authors = new {book.Author},
                                Description = book.Description   
                            }
                        }
                    }
                };
                
                return BookApiResponse ?? null!;
            }

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