import { AuthContext } from "@/contexts/authContext.ts";
import { env } from "@/lib/env";
import type { User } from "@/types/types.ts";
import { useEffect, useMemo, useState, type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext value={useAuth()}>{children}</AuthContext>;
};

const useAuth = () => {
  const [user, setUser] = useState<User>();
  const [userError, setUserError] = useState<Error | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const reqHeaders = useMemo(() => {
    return token ? new Headers({ Authorization: token }) : new Headers();
  }, [token]);

  useEffect(() => {
    const abrtController = new AbortController();

    void (async () => {
      try {
        const response = await fetch(`${env.apiBaseUrl}/auth/status`, {
          method: "get",
          signal: abrtController.signal,
          headers: reqHeaders,
        });

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const { user } = await response.json();
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
  }, [reqHeaders]);

  return { user, setUser, userError, userLoading, token, setToken };
};
