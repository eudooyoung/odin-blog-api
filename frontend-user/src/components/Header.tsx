import NavBar from "./NavBar.tsx";
import { authLinks, publicLinks } from "@/lib/link.ts";
import { useAuthContext } from "@/hooks/useAuthContext.ts";
import LogoutButton from "./LogoutButton.tsx";

const Header = () => {
  const { user } = useAuthContext();

  return (
    <header>
      <h1>Doolog</h1>
      <NavBar links={user ? authLinks : publicLinks} />
      {user && (
        <>
          <p>Hello, {user.displayName}</p>
          <LogoutButton />
        </>
      )}
    </header>
  );
};
export default Header;
