import { useAuthContext } from "@/hooks/useAuthContext.ts";

const ProfileView = ({
  editButtonHandler,
}: {
  editButtonHandler: () => void;
}) => {
  const { user } = useAuthContext();
  return (
    <div>
      <p>username: {user?.username}</p>
      <p>display name: {user?.displayName}</p>
      <button onClick={editButtonHandler} type="button">
        edit
      </button>
    </div>
  );
};
export default ProfileView;
