import type { GitHubUser } from "../api/githubUsers";
import { useFavoritesStore } from "../store/favouritesStore";

interface UserCardProps {
  user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(user.id));

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-md transition relative">
      <button
        onClick={() => toggleFavorite(user)}
        className="absolute top-2 right-2 text-5xl"
        aria-label="Toggle favorite"
      >
        <span className={isFavorite ? "text-yellow-400" : "text-gray-400"}>
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
