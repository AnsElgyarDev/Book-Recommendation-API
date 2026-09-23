import IconButton from "./IconButton";
import "./SavedBookRow.css";

/**
 * book: { id, title, author, description }
 * deleting: whether a delete request for this row is in flight
 * onEdit: (book) => void
 * onDelete: (id) => void
 */
export default function SavedBookRow({ book, deleting, onEdit, onDelete }) {
  return (
    <div className="saved-row">
      <div className="saved-row__text">
        <div className="saved-row__heading">
          <span className="saved-row__title">{book.title}</span>
          <span className="saved-row__author">{book.author || "Unknown author"}</span>
        </div>
        {book.description && <p className="saved-row__description">{book.description}</p>}
      </div>
      <div className="saved-row__actions">
        <IconButton icon="edit" label="Edit" onClick={() => onEdit(book)} disabled={deleting} />
        <IconButton
          icon="delete"
          label="Delete"
          variant="danger"
          onClick={() => onDelete(book.id)}
          disabled={deleting}
        />
      </div>
    </div>
  );
}
