import { env } from "@/lib/env.ts";
import { fetchWithAuth } from "@/lib/fetchWithAuth.ts";
import type { User } from "@/types/types.ts";
import { useEffect, useState } from "react";

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userError, setUserError] = useState<Error | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const abrtController = new AbortController();

    void (async () => {
      try {
        const data = await fetchWithAuth(`${env.apiBaseUrl}/auth/status`, {
          method: "get",
          signal: abrtController.signal,
          headers: token ? { Authorization: token } : {},
        });

        const { user } = data;
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
  }, [token]);

  return { user, setUser, userError, userLoading, token, setToken };
};
