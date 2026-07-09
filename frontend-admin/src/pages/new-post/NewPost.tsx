import { PostInput } from "@/components/post-input/PostInput.tsx";
import styles from "./NewPost.module.css";

export const NewPost = () => {
  return (
    <section className={styles.newPost}>
      <h2 className={styles.newPostHeader}>New Post</h2>
      <PostInput />
    </section>
  );
};
