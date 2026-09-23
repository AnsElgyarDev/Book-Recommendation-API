using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using BookRecommendationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using BookRecommendationAPI.Services;
using BookRecommendationAPI.Dtos;

namespace BookRecommendationAPI.Endpoints;

public static class SavedBooksEndpoints
{
    public static void UseSavedBooksEndpoints(this WebApplication app)
    {
        // CRUD operations for the Saved Books
     
        var savedBooksGroup = app.MapGroup("/api/saved-books");
        
        savedBooksGroup.MapGet("/", async (ISavedBooksServices service) =>
        {
            var books = await service.GetAll(string.Empty);
            return Results.Ok(books);
        });

        savedBooksGroup.MapGet("/{id}", async (string id, ISavedBooksServices service) =>
        {
            var book = await service.GetById(id);
            return book is not null ? Results.Ok(book) : Results.NotFound(new { message = "Book not found." });
        });

        savedBooksGroup.MapPut("/{id}", async (string id, SavedBook updatedBook, ISavedBooksServices service) =>
        {
            var result = await service.Update(id, updatedBook);
            return result is not null ? Results.Ok(new { message = "Updated successfully", result }) : Results.NotFound(new { message = "Book not found." });
        });

        savedBooksGroup.MapDelete("/{id}", async (string id, ISavedBooksServices service) =>
        {
            var deleted = await service.Delete(id);
            return deleted ? Results.Ok(new { message = "Deleted successfully" }) : Results.NotFound(new { message = "Book not found." });
        });
    }
}