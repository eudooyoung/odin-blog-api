import { AuthContext } from "@/context/AuthContext.ts";
import { type ReactNode } from "react";
import { useAuthState } from "../hooks/useAuthState.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthState();
  if (auth.userLoading) {
    return null;
  }
  return <AuthContext value={auth}>{children}</AuthContext>;
};
