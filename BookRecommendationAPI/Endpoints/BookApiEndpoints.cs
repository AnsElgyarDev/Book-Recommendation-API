namespace BookRecommendationAPI.Endpoints;

public static class BookApiEndpoints
{
    public static void UseBookApiEndpoints(this WebApplication app)
    {
        app.MapGet("/api/books/search", async Task<Results<BadRequest<string>, NotFound<string>, Ok<BookApiResponse>>>
                (string query, GoogleBooksService booksService) =>
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return TypedResults.BadRequest("Query parameter 'query' is required.");
            }

            var books = await booksService.SearchBooksAsync(query);
            
            if (books?.Items == null)
            {
                return Results.NotFound("No books found");
            }

            return TypedResults.Ok(books.Items);
        });
    }
}