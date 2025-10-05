import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import PaginationControls from "../components/PaginationControls";
import UserList from "../components/UsersList";
import { useUsers } from "../hooks/useUsers";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const since = Number(searchParams.get("since")) || 0;
  const perPage = Number(searchParams.get("perPage")) || 9;
  const initialSearch = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedTerm, setDebouncedTerm] = useState(initialSearch);

  const { users, loading, error } = useUsers(since, perPage);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (debouncedTerm) {
      newParams.set("search", debouncedTerm);
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  }, [debouncedTerm, searchParams, setSearchParams]);

  const filteredUsers = users.filter((user) =>
    user.login.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  const goNext = () => {
    const lastUser = users[users.length - 1];
    if (lastUser) {
      updateParams({ since: String(lastUser.id), perPage: String(perPage) });
    }
  };

  const goPrev = () => {
    const prev = Math.max(since - perPage, 0);
    updateParams({ since: String(prev), perPage: String(perPage) });
  };

  const goFirst = () => {
    updateParams({ since: "0", perPage: String(perPage) });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">GitHub Users</h1>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && filteredUsers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            {debouncedTerm
              ? `No users found matching "${debouncedTerm}"`
              : "No users found."}
          </p>
        </div>
      )}

      <UserList users={filteredUsers} />

      <PaginationControls
        since={since}
        perPage={perPage}
        goNext={goNext}
        goPrev={goPrev}
        goFirst={goFirst}
        disablePrev={since <= 0}
        disableNext={users.length < perPage}
      />
    </div>
  );
}
