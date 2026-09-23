using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using BookRecommendationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using BookRecommendationAPI.Services;
using BookRecommendationAPI.Dtos;

namespace BookRecommendationAPI.Endpoints;

public static class BookApiEndpoints
{
    public static void UseBookApiEndpoints(this WebApplication app)
    {
        app.MapGet("/api/books/search", async Task<Results<BadRequest<string>, NotFound<string>, Ok<List<BookDto>>>>
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
            
            var bookDtos = books.BookItems.Select(item => new BookDto
            {
                Title = item.VolumeInfo?.Title ?? string.Empty,
                Authors = item.VolumeInfo?.Authors ?? new List<string>(),
                Description = item.VolumeInfo?.Description ?? string.Empty,
                PagesCount = item.VolumeInfo?.pagesCount 
            }).ToList();

            return TypedResults.Ok(bookDtos);
        });
    }
}