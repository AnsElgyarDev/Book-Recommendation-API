import "./Skeleton.css";

/**
 * variant: "card" | "row"
 * count: how many placeholders to render
 */
export default function Skeleton({ variant = "card", count = 6 }) {
  const items = Array.from({ length: count });

  if (variant === "row") {
    return (
      <div className="skeleton-rows" aria-hidden="true">
        {items.map((_, i) => (
          <div className="skeleton-row" key={i}>
            <div className="skeleton-line skeleton-line--title" />
            <div className="skeleton-line skeleton-line--body" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="skeleton-grid" aria-hidden="true">
      {items.map((_, i) => (
        <div className="skeleton-card" key={i}>
          <div className="skeleton-line skeleton-line--title" />
          <div className="skeleton-line skeleton-line--meta" />
          <div className="skeleton-line skeleton-line--body" />
          <div className="skeleton-line skeleton-line--body" style={{ width: "70%" }} />
        </div>
      ))}
    </div>
  );
}
