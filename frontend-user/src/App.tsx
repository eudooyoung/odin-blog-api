import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
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
