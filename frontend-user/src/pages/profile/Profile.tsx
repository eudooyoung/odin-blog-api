import ProfileView from "@/components/profile-view/ProfileView";
import { useAuthContext } from "@/hooks/useAuthContext.ts";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user } = useAuthContext();

  return (
    <section className={styles.profile}>
      <h2 className={styles.profileHeader}>Profile</h2>
      <ProfileView user={user!} />
    </section>
  );
};
export default Profile;
