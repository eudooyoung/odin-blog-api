import { useSignup } from "@/hooks/useSignup.ts";
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
    confirmPassword: "",
    displayName: "",
  });
  const { signup, signupLoading, signupValidationError, signupError } =
    useSignup();
  const navigate = useNavigate();

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signupHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await signup(form);
    if (
      !signupLoading &&
      Object.keys(signupValidationError).length === 0 &&
      signupError === null
    ) {
      navigate("/login", { state: { message: "signup success" } });
    }
  };

  return (
    <form onSubmit={signupHandler} aria-label="signup">
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={form.username}
        onChange={inputChangeHandler}
        required
      />
      {signupValidationError.username && signupValidationError.username}
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={form.password}
        onChange={inputChangeHandler}
        required
      />
      {signupValidationError.password && signupValidationError.password}
      <label htmlFor="confirmPassword">confirm password</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={form.confirmPassword}
        onChange={inputChangeHandler}
        required
      />
      {signupValidationError.confirmPassword &&
        signupValidationError.confirmPassword}
      <label htmlFor="displayName">display name</label>
      <input
        type="text"
        id="displayName"
        name="displayName"
        value={form.displayName}
        onChange={inputChangeHandler}
        required
      />
      {signupValidationError.displayName && signupValidationError.displayName}
      <button type="submit" disabled={signupLoading}>
        Signup
      </button>
      {signupError && signupError.message}
    </form>
  );
};
export default SignupForm;
