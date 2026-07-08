import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user, token } = useAuthContext();
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
