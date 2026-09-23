import "./Button.css";

/**
 * variant: "primary" | "ghost" | "danger"
 * Spreads any other button props (onClick, type, disabled, ...) straight through.
 */
export default function Button({ variant = "primary", className = "", children, ...props }) {
  return (
    <button className={`btn btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
