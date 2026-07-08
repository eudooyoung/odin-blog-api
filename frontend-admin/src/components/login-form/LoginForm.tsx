import { useLogin } from "@/hooks/useLogin.ts";
import type { LoginBody } from "@/types/types.ts";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { useNavigate } from "react-router";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [form, setForm] = useState<LoginBody>({ username: "", password: "" });
  const { login, loginLoading, loginError } = useLogin();
  const navigate = useNavigate();

  const inputChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const success = await login(form);
    if (success) {
      navigate("/");
    }
  };

  return (
    <form
      className={styles.loginForm}
      onSubmit={loginHandler}
      aria-label="login">
      <div className={styles.loginField}>
        <label className={styles.loginLabel} htmlFor="username">
          Username
        </label>
        <input
          className={styles.loginInput}
          type="email"
          name="username"
          id="username"
          value={form.username}
          onChange={inputChangeHandler}
          autoFocus
          required
        />
      </div>
      <div className={styles.loginField}>
        <label className={styles.loginLabel} htmlFor="password">
          Password
        </label>
        <input
          className={styles.loginInput}
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={inputChangeHandler}
          required
        />
      </div>
      <button
        className={styles.loginButton}
        type="submit"
        disabled={loginLoading}>
        Login
      </button>
      {loginError && <p>{loginError.message}</p>}
    </form>
  );
};
export default LoginForm;
