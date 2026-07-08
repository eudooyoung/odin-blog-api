import SignupForm from "@/components/signup-form/SignupForm.tsx";
import styles from "./Signup.module.css";

const Signup = () => {
  return (
    <section className={styles.signup}>
      <h2 className={styles.signupHeader}>Sign Up</h2>
      <SignupForm />
    </section>
  );
};
export default Signup;
