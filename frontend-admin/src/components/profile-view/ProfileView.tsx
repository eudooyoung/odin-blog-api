import type { User } from "@/types/types.ts";
import styles from "./ProfileView.module.css";

const ProfileView = ({ user }: { user: User }) => {
  return (
    <div className={styles.profileView}>
      <p className={styles.profileField}>
        <span className={styles.profileLabel}>Username:</span>
        <span>{user?.username}</span>
      </p>
      <p className={styles.profileField}>
        <span className={styles.profileLabel}>Display Name:</span>
        <span>{user?.displayName}</span>
      </p>
    </div>
  );
};
export default ProfileView;
