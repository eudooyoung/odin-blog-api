import { env } from "@/lib/env.ts";
import type {
  SignupBody,
  SignupValidationError,
  ValidationErrorResponse,
} from "@/types/types.ts";
import { useState } from "react";

export const useSignup = () => {
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupValidationError, setSignupValidationError] =
    useState<SignupValidationError>({});
  const [signupError, setSignupError] = useState<Error | null>(null);

  const signup = async (form: SignupBody) => {
    setSignupLoading(true);
    setSignupValidationError({});
    setSignupError(null);

    try {
      const response = await fetch(`${env.apiBaseUrl}/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const { errors }: { errors: ValidationErrorResponse[] } =
            await response.json();
          const errorSource = errors.map((error) => [error.path, error.msg]);
          setSignupValidationError(Object.fromEntries(errorSource));
        } else {
          const { error } = await response.json();
          setSignupError(error);
        }
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        setSignupError(error);
      }
    } finally {
      setSignupLoading(false);
    }
  };
  return { signup, signupLoading, signupValidationError, signupError };
};
