import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext.ts";
import { useAuthState } from "@/hooks/useAuthState.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthState();
  if (auth.userLoading) {
    return null;
  }
  return <AuthContext value={auth}>{children}</AuthContext>;
};
