import { usePosts } from "@/hooks/usePosts";
import { Link } from "react-router";
import styles from "./Posts.module.css";

const Posts = () => {
  const { posts, postsError, postsLoading } = usePosts();

  return (
    <>
      {/* {postsLoading && <span>loading...</span>} */}
      {postsError && <span>{postsError.message}</span>}
      {posts && (
        <div className={styles.posts}>
          {posts.map((post) => (
            <section className={styles.postThumbnail} key={post.id}>
              <h4 className={styles.postThumbnailHeader}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h4>
              <p className={styles.postThumbnailContent}>{post.content}</p>
              <p className={styles.postThumbnailDate}>
                {new Intl.DateTimeFormat("ko-KR", {
                  dateStyle: "short",
                }).format(new Date(post.createdAt))}
              </p>
              {post.published ? <p>Published</p> : <p>Not published</p>}
            </section>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
