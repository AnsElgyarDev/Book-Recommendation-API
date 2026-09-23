import Button from "./Button";
import "./EmptyState.css";

export default function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <p className="empty-state__title">{title}</p>
      {description && <p className="empty-state__description">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="ghost" onClick={onAction} className="empty-state__action">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
