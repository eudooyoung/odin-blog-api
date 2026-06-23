import { useAuthContext } from "@/hooks/useAuthContext.ts";
import type { MouseEventHandler } from "react";
import { useNavigate } from "react-router";

const LogoutButton = () => {
  const { setUser, setToken } = useAuthContext();
  const navigate = useNavigate();
  const logoutHandler: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
    setToken(null);
    navigate("/");
  };
  return <button onClick={logoutHandler}>Logout</button>;
};
export default LogoutButton;
