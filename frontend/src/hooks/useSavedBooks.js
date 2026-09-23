import { useCallback, useEffect, useState } from "react";
import { savedBooksService } from "../services/savedBooksService";

export function useSavedBooks() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await savedBooksService.getAll();
      setBooks(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (e) {
      setError(e.message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const saveBook = useCallback(async (book) => {
    const saved = await savedBooksService.save(book);
    setBooks((prev) => [saved, ...prev]);
    return saved;
  }, []);

  const updateBook = useCallback(async (id, dto) => {
    // Endpoint responds with { message, result }
    const { result } = await savedBooksService.update(id, dto);
    setBooks((prev) => prev.map((b) => (b.id === id ? result : b)));
    return result;
  }, []);

  const deleteBook = useCallback(async (id) => {
    await savedBooksService.delete(id);
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const isSaved = useCallback((id) => books.some((b) => b.id === id), [books]);

  return { books, status, error, fetchAll, saveBook, updateBook, deleteBook, isSaved };
}
