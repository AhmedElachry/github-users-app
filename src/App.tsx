import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import ToggleDarkMode from "./components/ToggleDarkMode";

function App() {
  return (
    <div className="dark:bg-gray-800 dark:text-white min-h-dvh">
      <nav className="p-4 border-b border-gray-300 flex justify-between items-center">
        <div>
          <Link to="/" className="p-4">
            Home
          </Link>
          <Link className="p-4" to="/favorites">
            Favorites
          </Link>
        </div>

        <ToggleDarkMode />
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
