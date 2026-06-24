import NavBar from "./NavBar.tsx";
import { authLinks, publicLinks } from "@/lib/link.ts";
import { useAuthContext } from "@/hooks/useAuthContext.ts";
import LogoutButton from "./LogoutButton.tsx";

const Header = () => {
  const { user, token } = useAuthContext();

  return (
    <header>
      <h1>Doolog</h1>
      <NavBar links={token ? authLinks : publicLinks} />
      {user && <p>Hello, {user.displayName}</p>}
      {token && <LogoutButton />}
    </header>
  );
};
export default Header;
