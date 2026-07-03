import type { User } from "@/types/types.ts";

const ProfileView = ({ user }: { user: User }) => {
  return (
    <div>
      <p>username: {user?.username}</p>
      <p>display name: {user?.displayName}</p>
    </div>
  );
};
export default ProfileView;
