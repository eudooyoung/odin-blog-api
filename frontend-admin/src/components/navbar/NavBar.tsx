import type { Links } from "@/types/types.ts";
import { NavLink } from "react-router";
import styles from "./NavBar.module.css";

const NavBar = ({ links }: { links: Links }) => {
  return (
    <nav className={styles.navLinks}>
      {links.map((link, idx) => (
        <NavLink
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
          key={idx}
          to={link.to}>
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
