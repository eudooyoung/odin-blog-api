import { env } from "@/lib/env.ts";
import type { LoginBody, LoginResponse } from "@/types/types.ts";
import { useState } from "react";

const useLogin = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<Error | null>(null);

  const login = async (form: LoginBody): LoginResponse => {
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
        throw error;
      }

      const { user, token } = await response.json();
      return { user, token };
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
export default useLogin;
