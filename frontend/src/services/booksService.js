import httpClient from "./httpClient";

export const booksService = {
  // GET /api/books/search?query=...  ->  BookDto[]
  search: (query) => httpClient.get("/books/search", { params: { query } }),
};
