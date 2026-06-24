import type { Links } from "@/types/types.ts";
import { NavLink } from "react-router";

const NavBar = ({ links }: { links: Links }) => {
  return (
    <nav>
      {links.map((link, idx) => (
        <NavLink key={idx} to={link.to}>
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
