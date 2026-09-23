import BookCard from "../shared/BookCard";
import Skeleton from "../shared/Skeleton";
import EmptyState from "../shared/EmptyState";
import "./BookGrid.css";

/**
 * status: "idle" | "loading" | "error" | "success"
 * books: BookDto[]
 * isSaved: (id) => boolean
 * savingId: id currently being saved, or null
 * onSave: (book) => void
 */
export default function BookGrid({ status, books, error, isSaved, savingId, onSave }) {
  if (status === "idle") {
    return (
      <EmptyState
        title="Search for a book to get started"
        description="Try a title, an author, or a topic you're curious about."
      />
    );
  }

  if (status === "loading") {
    return (
      <div>
        <p className="book-grid__count">SEARCHING…</p>
        <Skeleton variant="card" count={6} />
      </div>
    );
  }

  if (status === "error") {
    return <EmptyState title="Search failed" description={error || "Something went wrong."} />;
  }

  if (!books.length) {
    return (
      <EmptyState
        title="No results"
        description="Nothing matched that search. Try a different title or author."
      />
    );
  }

  return (
    <div>
      <p className="book-grid__count">
        {books.length} RESULT{books.length === 1 ? "" : "S"}
      </p>
      <div className="book-grid">
        {books.map((book) => (
          <BookCard
            key={book.id ?? book.title}
            book={book}
            saved={book.id ? isSaved(book.id) : false}
            saving={book.id === savingId}
            onSave={onSave}
          />
        ))}
      </div>
    </div>
  );
}
