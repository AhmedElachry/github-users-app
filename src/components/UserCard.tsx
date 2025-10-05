import type { GitHubUser } from "../api/githubUsers";

interface UserCardProps {
  user: GitHubUser;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow hover:shadow-md transition relative">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-16 h-16 rounded-full mb-2"
      />
      <p className="font-medium">{user.login}</p>
    </div>
  );
}
