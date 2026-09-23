import "./IconButton.css";

const ICONS = {
  edit: (
    <path
      d="M11.3 2.7a1.5 1.5 0 0 1 2.1 2.1l-7.5 7.5-2.8.7.7-2.8 7.5-7.5Z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  delete: (
    <>
      <path
        d="M3 5h10M6.5 5V3.5h3V5M4.5 5l.6 8.2a1 1 0 0 0 1 .8h3.8a1 1 0 0 0 1-.8L11.5 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  close: (
    <path
      d="M4 4l8 8M12 4l-8 8"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      fill="none"
    />
  ),
};

/**
 * icon: "edit" | "delete" | "close"
 * label: accessible name, also shown as a title tooltip
 * variant: "default" | "danger"
 */
export default function IconButton({ icon, label, variant = "default", ...props }) {
  return (
    <button
      type="button"
      className={`icon-btn icon-btn--${variant}`}
      aria-label={label}
      title={label}
      {...props}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        {ICONS[icon]}
      </svg>
    </button>
  );
}
