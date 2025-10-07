import { useFavoritesStore } from "../store/favouritesStore";
import UserCard from "../components/UserCard";
import ScrollToTopComponent from "../components/ScrollToTop";

export default function FavoritesPage() {
  const favorites = useFavoritesStore((state) => state.favorites);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">⭐ Favorite Users</h1>

      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorite users yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
      <ScrollToTopComponent />
    </div>
  );
}
