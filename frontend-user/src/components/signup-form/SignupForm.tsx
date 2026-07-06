import { useSignup } from "@/hooks/useSignup.ts";
import type { SignupBody } from "@/types/types.ts";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { useNavigate } from "react-router";
import styles from "./SignupForm.module.css";

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
    const success = await signup(form);
    if (success) {
      navigate("/login", { state: { message: "signup success" } });
    }
  };

  return (
    <form
      className={styles.signupForm}
      onSubmit={signupHandler}
      aria-label="signup">
      <div className={styles.signupField}>
        <label htmlFor="username">Username</label>
        <input
          className={styles.signupInput}
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={inputChangeHandler}
          required
        />
        {signupValidationError.username && signupValidationError.username}
      </div>
      <div className={styles.signupField}>
        <label htmlFor="password">Password</label>
        <input
          className={styles.signupInput}
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={inputChangeHandler}
          required
        />
        {signupValidationError.password && signupValidationError.password}
      </div>
      <div className={styles.signupField}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className={styles.signupInput}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={inputChangeHandler}
          required
        />
        {signupValidationError.confirmPassword &&
          signupValidationError.confirmPassword}
      </div>
      <div className={styles.signupField}>
        <label htmlFor="displayName">Display Name</label>
        <input
          className={styles.signupInput}
          type="text"
          id="displayName"
          name="displayName"
          value={form.displayName}
          onChange={inputChangeHandler}
          required
        />
        {signupValidationError.displayName && signupValidationError.displayName}
      </div>
      <button
        className={styles.signupButton}
        type="submit"
        disabled={signupLoading}>
        Signup
      </button>
      {signupError && signupError.message}
    </form>
  );
};
export default SignupForm;
