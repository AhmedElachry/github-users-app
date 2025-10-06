import type { GitHubUser } from "../api/githubUsers";
import { useFavoritesStore } from "../store/favouritesStore";

interface UserCardProps {
  user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(user.id));

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-md dark:hover:shadow-blue-300 transition duration-700  relative">
      <button
        onClick={() => toggleFavorite(user)}
        aria-label="Toggle favorite"
        className="absolute top-2 right-2 text-5xl cursor-pointer transition-transform duration-200 active:scale-75"
      >
        <span
          className={`inline-block transition-all duration-300 ${
            isFavorite
              ? "text-yellow-400 scale-110 "
              : "text-gray-400 hover:text-yellow-300"
          }`}
        >
          ★
        </span>
      </button>

      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full mb-2"
      />
      <p className="font-medium">{user.login}</p>
      <a
        href={user.html_url}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 text-sm"
      >
        View Profile
      </a>
    </div>
  );
}
