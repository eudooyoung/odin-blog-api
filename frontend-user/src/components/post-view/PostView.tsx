import type { Post } from "@/types/types.ts";
import styles from "./PostView.module.css";
import DOMPurify from "dompurify";

export const PostView = ({ post }: { post: Post }) => {
  const sanitizeContent = (raw: string) => {
    const sanitized = DOMPurify.sanitize(raw);
    return { __html: sanitized };
  };

  return (
    <article className={styles.postView}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <div className={styles.postMeta}>
        <span className={styles.postDate}>
          {new Intl.DateTimeFormat("ko-KR", {
            dateStyle: "short",
          }).format(new Date(post.createdAt))}
        </span>
        <span className={styles.postAuthor}>{post.author.displayName}</span>
      </div>
      <p
        className={styles.postContent}
        dangerouslySetInnerHTML={sanitizeContent(post.content)}></p>
    </article>
  );
};
