import PageShell from "../components/layout/PageShell";
import FavoritesList from "../components/favorites/FavoritesList";
import { useSavedBooks } from "../hooks/useSavedBooks";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const { books, status, error, updateBook, deleteBook } = useSavedBooks();

  return (
    <PageShell>
      <div className="favorites-page__header">
        <h1 className="favorites-page__title">Saved books</h1>
        {status === "success" && (
          <span className="favorites-page__count">
            {books.length} TOTAL
          </span>
        )}
      </div>

      <FavoritesList
        status={status}
        books={books}
        error={error}
        onUpdate={updateBook}
        onDelete={deleteBook}
      />
    </PageShell>
  );
}
