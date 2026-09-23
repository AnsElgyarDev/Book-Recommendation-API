using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using BookRecommendationAPI.Models;
using Microsoft.AspNetCore.Mvc;
using BookRecommendationAPI.Services;
using BookRecommendationAPI.Dtos;

namespace BookRecommendationAPI.Endpoints;

public static class SavedBooksEndpoints
{
    // Crud operations for the Saved Books
    public static void UseSavedBooksEndpoints(this WebApplication app)
    {
        private readonly SavedBooksServices _savedBookServices;

        public SavedBooksEnpoints(SavedBooksServices _savedBookServices)
        {
            this._savedBookServices = savedBookServices;
        }

        app.MapGet("api/Books/{id:int}", async Task<Results<NotFound<string>, Ok<List<SavedBook>>>>
                  (string id) =>
        {   
           var books = await _savedBookServices.GetAll(id);

           if(books is null)
           {
                return TypedResults.NotFound("There is no Books with this user");
           }

           return TypedResults.Ok(books);
        });
    }
}