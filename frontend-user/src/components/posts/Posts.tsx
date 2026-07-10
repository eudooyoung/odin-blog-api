import { usePosts } from "@/hooks/usePosts";
import { Link } from "react-router";
import styles from "./Posts.module.css";

const Posts = () => {
  const { posts, postsError, postsLoading } = usePosts();

  const getTextFromContent = (raw: string) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(raw, "text/html");
    return dom.body.textContent;
  };

  return (
    <>
      {postsLoading && <span>loading...</span>}
      {postsError && <span>{postsError.message}</span>}
      {posts && (
        <div className={styles.posts}>
          {posts.map((post) => (
            <section className={styles.postThumbnail} key={post.id}>
              <h4 className={styles.postThumbnailHeader}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h4>
              <p className={styles.postThumbnailContent}>
                {getTextFromContent(post.content)}
              </p>
              <p className={styles.postThumbnailDate}>
                {new Intl.DateTimeFormat("ko-KR", {
                  dateStyle: "short",
                }).format(new Date(post.createdAt))}
              </p>
            </section>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
