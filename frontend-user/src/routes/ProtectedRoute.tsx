import { useAuthContext } from "@/hooks/useAuthContext.ts";
import Login from "@/pages/Login.tsx";
import { Outlet } from "react-router";

const ProtectedRoute = () => {
  const { token } = useAuthContext();
  return <>{token ? <Outlet /> : <Login />}</>;
};
export default ProtectedRoute;
