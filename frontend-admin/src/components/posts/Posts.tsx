import { usePosts } from "@/hooks/usePosts";
import { Link } from "react-router";
import styles from "./Posts.module.css";
import { usePublish } from "@/hooks/usePublish";
import { useUnpublish } from "@/hooks/useUnpublish.ts";

const Posts = () => {
  const { posts, postsError, postsLoading, refetchPosts } = usePosts();
  const { publish, publishLoading, publishError } = usePublish();
  const { unpublish, unpublishLoading, unpublishError } = useUnpublish();

  const getTextFromContent = (raw: string) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(raw, "text/html");
    return dom.body.textContent;
  };

  const onPublish = async (postId: number) => {
    const success = await publish(postId);
    if (success) {
      refetchPosts();
    }
  };

  const onUnpublish = async (postId: number) => {
    const success = await unpublish(postId);
    if (success) {
      refetchPosts();
    }
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
              <div className={styles.postThumbnailFooter}>
                <p className={styles.postThumbnailDate}>
                  {new Intl.DateTimeFormat("ko-KR", {
                    dateStyle: "short",
                  }).format(new Date(post.createdAt))}
                </p>
                {post.published ? (
                  <div className={styles.postThumbnailPublishedWrapper}>
                    <p>Published</p>
                    <button
                      disabled={publishLoading}
                      onClick={() => onUnpublish(post.id)}>
                      Unpublish
                    </button>
                    {publishError && <p>{publishError.message}</p>}
                  </div>
                ) : (
                  <div className={styles.postThumbnailPublishedWrapper}>
                    <p>Not published</p>
                    <button
                      disabled={unpublishLoading}
                      onClick={() => onPublish(post.id)}>
                      Publish
                    </button>
                    {unpublishError && <p>{unpublishError.message}</p>}
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
