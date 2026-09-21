using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using BookRecommendationAPI.Models;
using BookRecommendationAPI.Services;

namespace BookRecommendationAPI.Endpoints;

public static class BookApiEndpoints
{
    public static void UseBookApiEndpoints(this WebApplication app)
    {
        app.MapGet("/api/books/search", async Task<Results<BadRequest<string>, NotFound<string>, Ok<List<BookItem>>>>
                (string query, GoogleBooksService booksService) =>
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return TypedResults.BadRequest("Query parameter 'query' is required.");
            }

            var books = await booksService.SearchBooksAsync(query);

            if (books is null || books.BookItems is null)
            {
                return TypedResults.NotFound("No books found");
            }

            return TypedResults.Ok(books.BookItems);
        });
    }
}