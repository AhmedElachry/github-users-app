import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import Navbar from "./components/NavBar";

function App() {
  return (
    <div className="dark:bg-gray-800 dark:text-white min-h-dvh">
      <Navbar />

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
