import ProfileView from "@/components/ProfileView.tsx";
import { useAuthContext } from "@/hooks/useAuthContext.ts";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <>
      <h2>Profile</h2>
      <ProfileView user={user!} />
    </>
  );
};
export default Profile;
