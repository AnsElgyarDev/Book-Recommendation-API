import { useState } from "react";
import PageShell from "../components/layout/PageShell";
import SearchBar from "../components/search/SearchBar";
import BookGrid from "../components/search/BookGrid";
import { useSearchBooks } from "../hooks/useSearchBooks";
import { useSavedBooks } from "../hooks/useSavedBooks";
import { useToast } from "../context/ToastContext";
import "./SearchPage.css";

export default function SearchPage() {
  const { results, status, error, search } = useSearchBooks();
  const { saveBook, isSaved } = useSavedBooks();
  const [savingId, setSavingId] = useState(null);
  const toast = useToast();

  const handleSave = async (book) => {
    if (!book.id) {
      toast.error("This result can't be saved yet — it's missing an id.");
      return;
    }
    setSavingId(book.id);
    try {
      await saveBook(book);
      toast.success(`Saved "${book.title}" to favorites.`);
    } catch (e) {
      toast.error(e.message || "Couldn't save that book.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <PageShell>
      <div className="search-page__header">
        <h1 className="search-page__title">Find your next read</h1>
        <SearchBar onSearch={search} loading={status === "loading"} />
      </div>

      <BookGrid
        status={status}
        books={results}
        error={error}
        isSaved={isSaved}
        savingId={savingId}
        onSave={handleSave}
      />
    </PageShell>
  );
}
