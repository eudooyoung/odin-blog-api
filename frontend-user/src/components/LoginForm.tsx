import { useAuthContext } from "@/hooks/useAuthContext.ts";
import useLogin from "@/hooks/useLogin.ts";
import { env } from "@/lib/env.ts";
import type { LoginBody } from "@/types/types.ts";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const { setUser, setToken } = useAuthContext();
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
    console.log(1);

    const { user, token } = await login(form);
    if (loginError) {
      return;
    }
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  };

  return (
    <form onSubmit={loginHandler} aria-label="login">
      <label htmlFor="username">username</label>
      <input
        type="email"
        name="username"
        id="username"
        onChange={inputChangeHandler}
        autoFocus
        required
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={inputChangeHandler}
        required
      />
      <button type="submit" disabled={loginLoading}>
        login
      </button>
      {loginError && <p>{loginError.message}</p>}
    </form>
  );
};
export default LoginForm;
