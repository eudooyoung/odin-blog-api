import { env } from "@/lib/env.ts";
import type {
  SignupBody,
  SignupError,
  SignupValidationResponse,
} from "@/types/types.ts";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { useNavigate } from "react-router";

const SignupForm = () => {
  const [form, setForm] = useState<SignupBody>({
    username: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });
  const [signupError, setSignupError] = useState<SignupError>({});
  const [serverError, setServerError] = useState<Error | null>(null);
  const [signupLoading, setSignupLoading] = useState(false);
  const navigate = useNavigate();

  const formChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signupHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setSignupError({});
      setSignupLoading(true);

      const response = await fetch(`${env.apiBaseUrl}/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data: SignupValidationResponse = await response.json();

      if (!response.ok) {
        if (response.status < 500) {
          setSignupError(
            Object.fromEntries(data.errors.map((e) => [e.path, e.msg])),
          );
        } else {
          setServerError(new Error(`Server error: ${response.status}`));
        }

        return;
      }

      navigate("/login", { state: { message: "signup success!" } });
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error);
      }
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <form onSubmit={signupHandler}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={form.username}
        onChange={formChangeHandler}
      />
      {signupError.username && signupError.username}
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={form.password}
        onChange={formChangeHandler}
      />
      {signupError.password && signupError.password}
      <label htmlFor="confirmPassword">confirm password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={formChangeHandler}
      />
      {signupError.confirmPassword && signupError.confirmPassword}
      <label htmlFor="displayName">display name</label>
      <input
        type="text"
        id="displayName"
        name="displayName"
        value={form.displayName}
        onChange={formChangeHandler}
      />
      {signupError.displayName && signupError.displayName};
      <button type="submit" disabled={signupLoading}>
        Signup
      </button>
      {serverError && serverError.message}
    </form>
  );
};
export default SignupForm;
