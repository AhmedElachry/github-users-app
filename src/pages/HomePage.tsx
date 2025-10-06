import { useEffect, useRef, useState, useMemo } from "react";
import SearchBar from "../components/SearchBar";
import UserList from "../components/UsersList";
import UserSkeletonList from "../components/UserSkeleton";
import { useUsers } from "../hooks/useUsers";
import type { GitHubUser } from "../api/githubUsers";

export default function HomePage() {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [since, setSince] = useState(0);
  const perPage = 15;

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const { users: fetchedUsers, loading, error } = useUsers(since, perPage);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (fetchedUsers.length > 0) {
      setUsers((prev) => {
        const existingIds = new Set(prev.map((u) => u.id));
        const newUsers = fetchedUsers.filter((u) => !existingIds.has(u.id));
        return [...prev, ...newUsers];
      });
    }
  }, [fetchedUsers]);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTerm(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const filteredUsers = useMemo(() => {
    if (!debouncedTerm) return users;
    const term = debouncedTerm.toLowerCase();
    return users.filter((user) => user.login.toLowerCase().includes(term));
  }, [users, debouncedTerm]);

  const isSearching = debouncedTerm.length > 0;

  useEffect(() => {
    if (isSearching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && users.length > 0) {
          const lastUser = users[users.length - 1];
          setSince(lastUser.id);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loading, users, isSearching]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">GitHub Users</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {error && !loading && users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
        </div>
      )}

      {loading && users.length === 0 ? (
        <UserSkeletonList count={perPage} />
      ) : (
        <>
          {filteredUsers.length === 0 && !loading && users.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {debouncedTerm
                  ? `No users found matching "${debouncedTerm}"`
                  : "No users found."}
              </p>
            </div>
          )}

          <UserList users={filteredUsers} />

          {!isSearching && <div ref={observerRef} className="h-10" />}

          {loading && users.length > 0 && !isSearching && (
            <p className="text-center text-gray-500 py-4">
              Loading more users...
            </p>
          )}
        </>
      )}
    </div>
  );
}
