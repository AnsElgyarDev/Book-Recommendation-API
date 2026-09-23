import { useCallback, useState } from "react";
import { booksService } from "../services/booksService";

export function useSearchBooks() {
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | error | success
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    if (!query?.trim()) return;
    setStatus("loading");
    setError(null);
    try {
      const data = await booksService.search(query.trim());
      setResults(Array.isArray(data) ? data : []);
      setStatus("success");
    } catch (e) {
      setError(e.message);
      setResults([]);
      setStatus("error");
    }
  }, []);

  return { results, status, error, search };
}
