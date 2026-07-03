import { usePosts } from "@/hooks/usePosts";
import { Link } from "react-router";
import styles from "../pages/Home.module.css";

const Posts = () => {
  const { posts, postsError, postsLoading } = usePosts();

  return (
    <section className={styles.postsWrapper}>
      <h3>Posts</h3>
      {postsLoading && <span>loading...</span>}
      {postsError && <span>{postsError.message}</span>}
      {posts && (
        <div className={styles.posts}>
          {posts.map((post) => (
            <section className={styles.post} key={post.id}>
              <h4>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h4>
              <p>{post.content}</p>
              <footer className={styles.postThumbnailDate}>
                {new Intl.DateTimeFormat("ko-KR", {
                  dateStyle: "short",
                }).format(new Date(post.createdAt))}
              </footer>
            </section>
          ))}
        </div>
      )}
    </section>
  );
};

export default Posts;
