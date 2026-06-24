import Footer from "./components/Footer.tsx";
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import { AuthProvider } from "@/context/AuthProvider.tsx";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Main />
        <Footer />
      </AuthProvider>
    </>
  );
}
