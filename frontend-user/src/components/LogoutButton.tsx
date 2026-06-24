import { useAuthContext } from "@/hooks/useAuthContext.ts";
import type { MouseEventHandler } from "react";

const LogoutButton = () => {
  const { setUser, setToken } = useAuthContext();
  const logoutHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    setToken(null);
  };
  return <button onClick={logoutHandler}>Logout</button>;
};
export default LogoutButton;
