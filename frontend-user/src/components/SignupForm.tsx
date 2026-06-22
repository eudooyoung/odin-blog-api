import { env } from "@/lib/env.ts";
import type { SignupBody } from "@/types/types.ts";
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
    passwordConfirm: "",
    displayName: "",
  });
  const [signupError, setSignupError] = useState<Error | null>(null);
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
      setSignupError(null);
      setSignupLoading(true);

      const response = await fetch(`${env.apiBaseUrl}/users`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Server error: ${data.message}`);
      }

      navigate("/login", { state: { message: "signup success!" } });
    } catch (error) {
      if (error instanceof Error) {
        setSignupError(error);
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
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={form.password}
        onChange={formChangeHandler}
      />
      <label htmlFor="passwordConfirm">password confirm</label>
      <input
        type="password"
        id="passwordConfirm"
        name="passwordConfirm"
        value={form.passwordConfirm}
        onChange={formChangeHandler}
      />
      <label htmlFor="displayName">display name</label>
      <input
        type="text"
        id="displayName"
        name="displayName"
        value={form.displayName}
        onChange={formChangeHandler}
      />
      <button type="submit" disabled={signupLoading}>
        Signup
      </button>
      {signupError && <p>{signupError.message}</p>}
    </form>
  );
};
export default SignupForm;
