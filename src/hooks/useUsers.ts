import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { fetchUsers } from "../api/githubUsers";
import type { GitHubUser } from "../api/githubUsers";
export function useUsers(since: number, perPage: number) {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastSinceRef = useRef<number | null>(null);
  useEffect(() => {
    if (lastSinceRef.current === since) return;
    let cancelled = false;
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchUsers(since, perPage);
        if (!cancelled) {
          setUsers(data);
          lastSinceRef.current = since;
        }
      } catch (err) {
        if (cancelled) return;
        const message = (err as Error).message;
        setError(message);
        setUsers([]);
        if (since === 0) {
          toast.error(message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    loadUsers();
    return () => {
      cancelled = true;
    };
  }, [since, perPage]);
  return { users, loading, error };
}
