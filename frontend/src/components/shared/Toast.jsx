import IconButton from "./IconButton";
import "./Toast.css";

/**
 * toasts: [{ id, message, type: "success" | "error" }]
 * onDismiss: (id) => void
 */
export default function Toast({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          <span className="toast__message">{toast.message}</span>
          <IconButton icon="close" label="Dismiss" onClick={() => onDismiss(toast.id)} />
        </div>
      ))}
    </div>
  );
}
