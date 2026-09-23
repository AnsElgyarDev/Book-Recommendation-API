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
            var existingBook = await _context.SavedBooks
                                .FirstOrDefaultAsync(b => b.Title.ToLower().Contains(query.ToLower()) || query.ToLower().Contains(b.Title.ToLower()));

            if (existingBook != null)
            {
                Console.WriteLine("Came From Database!");

                return new BookApiResponse
                {
                    BookItems = new List<BookItem>
                    {
                        new BookItem
                        {
                            Id = existingBook.Id,
                            VolumeInfo = new VolumeInfo
                            {
                                Title = existingBook.Title,
                                Authors = string.IsNullOrEmpty(existingBook.Author) ? new List<string>() : new List<string> { existingBook.Author },
                                Description = existingBook.Description
                            }
                        }
                    }
                };
            }

            var url = $"volumes?q={Uri.EscapeDataString(query)}";
            if (!string.IsNullOrEmpty(_apiKey))
            {
                url += $"&key={_apiKey}";
            }

            var result = await _httpClient.GetFromJsonAsync<BookApiResponse>(url);
            var firstItem = result?.BookItems?.FirstOrDefault();

            if (firstItem != null)
            {
                var existsById = await _context.SavedBooks.AnyAsync(b => b.Id == firstItem.Id);

                if (!existsById)
                {
                    var savedBook = new SavedBook
                    {
                        Id = firstItem.Id ?? string.Empty,
                        Title = firstItem.VolumeInfo?.Title ?? string.Empty,
                        Author = firstItem.VolumeInfo?.Authors != null ? string.Join(", ", firstItem.VolumeInfo.Authors) : string.Empty,
                        Description = firstItem.VolumeInfo?.Description ?? string.Empty,
                        SavedAt = DateTime.UtcNow
                    };

                    await _context.SavedBooks.AddAsync(savedBook);
                    await _context.SaveChangesAsync();
                }
            }

            return result ?? null!;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error fetching books: {ex.Message}");
            return null!;            
        }
    }
}