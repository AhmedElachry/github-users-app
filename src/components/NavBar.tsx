import { NavLink } from "react-router-dom";
import ToggleDarkMode from "./ToggleDarkMode";

export default function Navbar() {
  const baseLinkClasses = "p-4 transition-colors hover:text-blue-500";
  const activeClasses =
    "text-blue-600 border-b-2 border-blue-600 dark:text-blue-200 dark:border-blue-200";

  return (
    <nav className="p-4 border-b border-gray-300 flex justify-between items-center">
      <div>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${baseLinkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${baseLinkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          Favorites
        </NavLink>
      </div>

      <ToggleDarkMode />
    </nav>
  );
}
