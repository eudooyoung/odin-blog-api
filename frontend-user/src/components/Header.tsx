import { useContext, useState } from "react";
import NavBar from "./NavBar.tsx";
import { AuthContext } from "@/contexts/authContext.ts";
import { authPages, publicPages } from "@/lib/page.ts";

const Header = () => {
  const { user, userError, token } = useContext(AuthContext);

  return (
    <header>
      <h1>Doolog</h1>
      <NavBar pages={token ? authPages : publicPages} />
      <p>Hello, {user?.displayName}</p>
    </header>
  );
};
export default Header;
