import type { Post } from "@/types/post.types.ts";
import styles from "./PostView.module.css";
import DOMPurify from "dompurify";
import { useDeletePost } from "@/hooks/useDeletePost.ts";
import { useNavigate } from "react-router";

export const PostView = ({
  post,
  onEdit,
}: {
  post: Post;
  onEdit: VoidFunction;
}) => {
  const navigate = useNavigate();
  const { deletePost, deletePostLoading, deletePostError } = useDeletePost(
    post.id,
  );

  const deletePostHandler = async () => {
    const success = await deletePost();
    if (success) {
      navigate("/");
    }
  };

  const sanitizeContent = (raw: string) => {
    const sanitized = DOMPurify.sanitize(raw);
    return { __html: sanitized };
  };

  if (deletePostError) {
    alert(deletePostError.message);
  }

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
        <div className={styles.buttonContainer}>
          <button onClick={deletePostHandler} disabled={deletePostLoading}>
            Delete
          </button>
          <button onClick={onEdit} className={styles.postEditButton}>
            Edit
          </button>
        </div>
      </div>
      <p
        className={styles.postContent}
        dangerouslySetInnerHTML={sanitizeContent(post.content)}></p>
    </article>
  );
};
