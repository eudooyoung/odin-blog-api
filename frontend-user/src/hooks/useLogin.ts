import { env } from "@/lib/env.ts";
import type { LoginBody } from "@/types/types.ts";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";

export const useLogin = () => {
  const { setUser, setToken } = useAuthContext();
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<Error | null>(null);

  const login = async (form: LoginBody) => {
    try {
      setLoginLoading(true);
      setLoginError(null);

      const response = await fetch(`${env.apiBaseUrl}/auth/login`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.log(error);
        throw error;
      }

      const { user, token } = await response.json();
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  return { login, loginLoading, loginError };
};
