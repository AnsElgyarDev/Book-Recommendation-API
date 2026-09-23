import { Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}
