import Footer from "./components/footer/Footer.tsx";
import Header from "./components/header/Header.tsx";
import Main from "./components/main/Main.tsx";
import { AuthProvider } from "@/context/AuthProvider.tsx";
import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <AuthProvider>
        <Header />
        <Main />
        <Footer />
      </AuthProvider>
    </div>
  );
}
