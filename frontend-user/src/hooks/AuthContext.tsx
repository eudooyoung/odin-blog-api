import { env } from "@/config/env.ts";
import type { User } from "@/types/types.ts";
import { createContext, useEffect, useState, type ReactNode } from "react";

const AuthContext = createContext<{
  user: User | undefined;
  userError: Error | null;
  userLoading: boolean;
} | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, userError, userLoading } = useAuth();

  return (
    <AuthContext value={{ user, userError, userLoading }}>
      {children}
    </AuthContext>
  );
};

const useAuth = () => {
  const [user, setUser] = useState<User>();
  const [userError, setUserError] = useState<Error | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const abrtController = new AbortController();

    void (async () => {
      try {
        const response = await fetch(`${env.apiBaseUrl}/auth/status`, {
          method: "get",
          signal: abrtController.signal,
        });

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const user = await response.json();
        setUser(user);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return;
          }
          setUserError(error);
        }
      } finally {
        if (!abrtController.signal.aborted) {
          setUserLoading(false);
        }
      }
    })();

    return () => {
      abrtController.abort();
    };
  }, []);

  return { user, userError, userLoading };
};
