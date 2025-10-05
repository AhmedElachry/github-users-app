import type { FC } from "react";
import type { GitHubUser } from "../api/githubUsers";
import UserCard from "./UserCard";

interface UserListProps {
  users: GitHubUser[];
}

const UserList: FC<UserListProps> = ({ users }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
