import NavBar from "../navbar/NavBar.tsx";
import { authLinks, publicLinks } from "@/lib/link.ts";
import { useAuthContext } from "@/hooks/useAuthContext.ts";
import styles from "./Header.module.css";
import type { MouseEventHandler } from "react";

const Header = () => {
  const { user, setUser, setToken } = useAuthContext();

  const logoutHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.banner}>Doolog</h1>
      <div className={styles.statusAndLinks}>
        <div className={styles.status}>
          {user && (
            <>
              <p>Hello, {user.displayName}</p>
              <button onClick={logoutHandler}>Logout</button>
            </>
          )}
        </div>
        <NavBar links={user ? authLinks : publicLinks} />
      </div>
    </header>
  );
};
export default Header;
