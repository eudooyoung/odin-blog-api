import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { token } = useAuthContext();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
