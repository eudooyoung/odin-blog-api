import type { Links } from "@/types/types.ts";
import { NavLink } from "react-router";
import styles from "./Header.module.css";

const NavBar = ({ links }: { links: Links }) => {
  return (
    <nav className={styles.links}>
      {links.map((link, idx) => (
        <NavLink key={idx} to={link.to}>
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
