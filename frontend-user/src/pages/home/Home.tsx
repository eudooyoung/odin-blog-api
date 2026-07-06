import Posts from "@/components/posts/Posts";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.home}>
      <h2 className={styles.homeHeader}>Home</h2>
      <Posts />
    </section>
  );
};

export default Home;
