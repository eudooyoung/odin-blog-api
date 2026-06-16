import type { Page } from "@/types/types.ts";
import { NavLink } from "react-router";

const pages: Page[] = [
  { name: "home", to: "/" },
  { name: "login", to: "/login" },
  { name: "signup", to: "/signup" },
];

const NavBar = () => {
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
