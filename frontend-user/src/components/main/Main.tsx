import { Outlet } from "react-router";
import styles from "./Main.module.css";
import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { Loading } from "../Loading.tsx";

const Main = () => {
  const { userLoading } = useAuthContext();
  if (userLoading) {
    return <Loading />;
  }

  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
};

export default Main;
