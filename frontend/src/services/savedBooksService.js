import httpClient from "./httpClient";

export const savedBooksService = {
  getAll: () => httpClient.get("/saved-books"),
  getById: (id) => httpClient.get(`/saved-books/${id}`),

  // IMPORTANT: `book.id` must be the Google Books volume id.
  // Your current BookDto (backend) does not return `Id` yet — only
  // Title / Authors / Description / PagesCount — so this will send
  // `id: undefined` until BookDto and BookApiEndpoints are updated to
  // include and map it. See the note at the bottom of this file.
  save: (book) =>
    httpClient.post("/saved-books", {
      id: book.id,
      title: book.title,
      author: Array.isArray(book.authors) ? book.authors.join(", ") : book.author ?? "",
      description: book.description ?? "",
    }),

  update: (id, dto) => httpClient.put(`/saved-books/${id}`, dto),
  delete: (id) => httpClient.delete(`/saved-books/${id}`),
};

/*
 * BACKEND FIX NEEDED (blocks Save end-to-end):
 *
 * 1. BookDto.cs — add:
 *      public string Id { get; set; } = string.Empty;
 *
 * 2. BookApiEndpoints.cs — map it in the projection:
 *      var bookDtos = books.BookItems.Select(item => new BookDto
 *      {
 *          Id = item.Id ?? string.Empty,
 *          Title = item.VolumeInfo?.Title ?? string.Empty,
 *          ...
 *      }).ToList();
 *
 * Without this, every search result's `id` is undefined and the POST
 * to /api/saved-books will save a book with an empty Id, defeating the
 * dedup check in GoogleBooksService and the `AnyAsync(b => b.Id == newBook.Id)`
 * check in SavedBooksEndpoints.
 */
