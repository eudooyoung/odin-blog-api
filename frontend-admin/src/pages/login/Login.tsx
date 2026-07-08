import LoginForm from "@/components/login-form/LoginForm";
import { useLocation } from "react-router";
import styles from "./Login.module.css";

const Login = () => {
  const location = useLocation();
  const message = location.state?.message;
  return (
    <section className={message ? styles.loginSuccess : styles.login}>
      <h2 className={styles.loginHeader}>Login</h2>
      {message && <span>{message}</span>}
      <LoginForm />
    </section>
  );
};

export default Login;
