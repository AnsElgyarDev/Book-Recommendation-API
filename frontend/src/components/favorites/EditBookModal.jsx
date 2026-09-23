import { useEffect, useState } from "react";
import Button from "../shared/Button";
import IconButton from "../shared/IconButton";
import { useToast } from "../../context/ToastContext";
import "./EditBookModal.css";

/**
 * book: { id, title, author, description }
 * onClose: () => void
 * onSave: (id, dto) => Promise
 */
export default function EditBookModal({ book, onClose, onSave }) {
  const [title, setTitle] = useState(book.title ?? "");
  const [author, setAuthor] = useState(book.author ?? "");
  const [description, setDescription] = useState(book.description ?? "");
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(book.id, { title, author, description });
      toast.success("Book updated.");
      onClose();
    } catch (err) {
      toast.error(err.message || "Couldn't save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Edit book</h2>
          <IconButton icon="close" label="Close" onClick={onClose} />
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__field">
            <span className="modal__label">Title</span>
            <input
              className="modal__input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              required
            />
          </label>

          <label className="modal__field">
            <span className="modal__label">Author</span>
            <input
              className="modal__input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>

          <label className="modal__field">
            <span className="modal__label">Description</span>
            <textarea
              className="modal__input modal__input--textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </label>

          <div className="modal__actions">
            <Button type="button" variant="ghost" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving || !title.trim()}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
