import type { Page } from "@/types/types.ts";
import { NavLink } from "react-router";

const NavBar = ({ pages }: { pages: Page[] }) => {
  return (
    <nav>
      {pages.map((page, idx) => (
        <NavLink key={idx} to={page.to}>
          {page.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default NavBar;
