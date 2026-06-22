import LoginForm from "@/components/LoginForm.tsx";
import { useLocation } from "react-router";

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;
  return (
    <>
      <h2>Login</h2>
      {message && <h3>{message}</h3>}
      <LoginForm />
    </>
  );
};

export default Login;
