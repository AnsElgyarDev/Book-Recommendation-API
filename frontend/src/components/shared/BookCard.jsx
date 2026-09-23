import Button from "./Button";
import "./BookCard.css";

/**
 * book: { id, title, authors: string[], description }
 * saved: whether this book is already in favorites
 * saving: whether a save request for this book is in flight
 * onSave: (book) => void
 */
export default function BookCard({ book, saved, saving, onSave }) {
  const author = book.authors?.length ? book.authors.join(", ") : "Unknown author";

  return (
    <div className="book-card">
      <div className="book-card__body">
        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{author}</p>
        {book.description && <p className="book-card__description">{book.description}</p>}
      </div>
      <Button
        variant={saved ? "ghost" : "primary"}
        disabled={saved || saving}
        onClick={() => onSave(book)}
        className="book-card__save"
      >
        {saved ? "✓ Saved" : saving ? "Saving…" : "+ Save"}
      </Button>
    </div>
  );
}
