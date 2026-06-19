import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { env } from "@/lib/env.ts";
import { useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const { setUser, setToken } = useAuthContext();
  const navigate = useNavigate();

  const loginHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      setLoginLoading(true);
      setLoginError(null);

      const response = await fetch(`${env.apiBaseUrl}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Server error: ${data.message}`);
      }

      const { user, token } = data;
      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setLoginError(error.message);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <form onSubmit={loginHandler} method="post">
      <label htmlFor="username">username</label>
      <input
        type="email"
        name="username"
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loginLoading}>
        login
      </button>
      {loginError && <p>{loginError}</p>}
    </form>
  );
};
export default LoginForm;
