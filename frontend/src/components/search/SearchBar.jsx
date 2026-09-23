import { useState } from "react";
import Button from "../shared/Button";
import "./SearchBar.css";

/**
 * onSearch: (query: string) => void
 */
export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        className="search-bar__input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by title or author"
        aria-label="Search by title or author"
      />
      <Button type="submit" disabled={loading || !query.trim()}>
        {loading ? "Searching…" : "Search"}
      </Button>
    </form>
  );
}
