import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { user, token } = useAuthContext();
  if (user?.role !== "ADMIN" || !token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
