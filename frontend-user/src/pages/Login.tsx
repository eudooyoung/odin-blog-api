import { AuthContext } from "@/contexts/authContext.ts";
import { env } from "@/lib/env";
import { useContext, useState, type SubmitEventHandler } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${env.apiBaseUrl}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const { user, token } = data;
      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={loginHandler} method="post">
        <label htmlFor="username">username</label>
        <input
          type="email"
          name="username"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </>
  );
};
export default Login;
