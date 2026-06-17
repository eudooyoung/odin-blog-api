import { env } from "@/config/env.ts";
import { useState, type SubmitEventHandler } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await fetch(`${env.apiBaseUrl}/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const { user, token } = await response.json();
    localStorage.setItem("token", token);
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
