import { useState } from "react";
import SavedBookRow from "../shared/SavedBookRow";
import Skeleton from "../shared/Skeleton";
import EmptyState from "../shared/EmptyState";
import EditBookModal from "./EditBookModal";
import { useToast } from "../../context/ToastContext";
import "./FavoritesList.css";

/**
 * status: "idle" | "loading" | "error" | "success"
 * books: SavedBook[]
 * onUpdate: (id, dto) => Promise
 * onDelete: (id) => Promise
 */
export default function FavoritesList({ status, books, error, onUpdate, onDelete }) {
  const [editingBook, setEditingBook] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const toast = useToast();

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await onDelete(id);
      toast.success("Book removed from favorites.");
    } catch (e) {
      toast.error(e.message || "Couldn't delete that book.");
    } finally {
      setDeletingId(null);
    }
  };

  if (status === "loading") {
    return <Skeleton variant="row" count={5} />;
  }

  if (status === "error") {
    return <EmptyState title="Couldn't load favorites" description={error || "Something went wrong."} />;
  }

  if (!books.length) {
    return (
      <EmptyState
        title="No saved books yet"
        description="Search for a book and save it to see it here."
      />
    );
  }

  return (
    <>
      <div className="favorites-list">
        {books.map((book) => (
          <SavedBookRow
            key={book.id}
            book={book}
            deleting={deletingId === book.id}
            onEdit={setEditingBook}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onSave={onUpdate}
        />
      )}
    </>
  );
}
