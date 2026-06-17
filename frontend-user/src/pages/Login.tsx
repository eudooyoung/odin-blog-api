import { env } from "@/config/env.ts";

const Login = () => {
  return (
    <>
      <h2>Login</h2>
      <form action={`${env.apiBaseUrl}/auth/login`} method="post">
        <label htmlFor="username">username</label>
        <input type="email" name="username" id="username" />
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
        <button type="submit">로그인</button>
      </form>
    </>
  );
};
export default Login;
