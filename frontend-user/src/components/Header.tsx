import NavBar from "./NavBar.tsx";
import { authPages, publicPages } from "@/lib/page.ts";
import { useAuthContext } from "@/hooks/useAuthContext.ts";

const Header = () => {
  const { user, token } = useAuthContext();

  return (
    <header>
      <h1>Doolog</h1>
      <NavBar pages={token ? authPages : publicPages} />
      {user && <p>Hello, {user.displayName}</p>}
    </header>
  );
};
export default Header;
