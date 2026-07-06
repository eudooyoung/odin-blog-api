import NavBar from "../NavBar.tsx";
import { authLinks, publicLinks } from "@/lib/link.ts";
import { useAuthContext } from "@/hooks/useAuthContext.ts";
import LogoutButton from "../LogoutButton.tsx";
import styles from "./Header.module.css";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <header className={styles.header}>
      <h1 className={styles.banner}>Doolog</h1>
      <NavBar links={user ? authLinks : publicLinks} />
      {user && (
        <div className={styles.status}>
          <p>Hello, {user.displayName}</p>
          <LogoutButton />
        </div>
      )}
    </header>
  );
};
export default Header;
