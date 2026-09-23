import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar__inner">
        <span className="navbar__logo">BOOK HUB</span>
        <nav className="navbar__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}
          >
            Search
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}
          >
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
