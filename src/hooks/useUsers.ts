import { useEffect, useState } from "react";
import { fetchUsers } from "../api/githubUsers";
import type { GitHubUser } from "../api/githubUsers";

export function useUsers(since: number, perPage: number) {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const data = await fetchUsers(since, perPage, token);
        setUsers(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [since, perPage]);

  return { users, loading, error };
}
