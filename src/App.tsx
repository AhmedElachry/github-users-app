import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";

function App() {
  return (
    <div className="min-h-dvh">
      <nav className="p-4 border-b border-gray-300">
        <Link to="/" className="p-4">
          Home
        </Link>
        <Link className="p-4" to="/favorites">
          Favorites
        </Link>
      </nav>

      <main className="p-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavouritesPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
