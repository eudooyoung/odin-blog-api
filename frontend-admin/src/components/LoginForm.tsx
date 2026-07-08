import { useLogin } from "@/hooks/useLogin.ts";
import type { LoginBody } from "@/types/types.ts";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { useNavigate } from "react-router";

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
    <form onSubmit={loginHandler} aria-label="login">
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          name="username"
          id="username"
          value={form.username}
          onChange={inputChangeHandler}
          autoFocus
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={form.password}
          onChange={inputChangeHandler}
          required
        />
      </div>
      <button type="submit" disabled={loginLoading}>
        Login
      </button>
      {loginError && <p>{loginError.message}</p>}
    </form>
  );
};
export default LoginForm;
