import { useCommentAction } from "@/hooks/useCommentAction.ts";
import type { CommentViewProps } from "@/types/comment.types.ts";
import { ErrorMessage } from "../ErrorMessage.tsx";
import styles from "./CommentView.module.css";

export const CommentView = ({
  postId,
  editingCommentId,
  setEditingCommentId,
  comment,
  refetchComments,
}: CommentViewProps) => {
  const { deleteComment, commentError, commentLoading } =
    useCommentAction(postId);

  const deleteCommentHandler = async (commentId: number) => {
    const success = await deleteComment(commentId);
    if (success) {
      await refetchComments();
    }
  };

  return (
    <section className={styles.commentView}>
      <header className={styles.commentHeader}>
        <h4>{comment.author.displayName}</h4>
        <div className={styles.commentButtons}>
          {editingCommentId !== comment.id && (
            <button onClick={() => setEditingCommentId(comment.id)}>
              edit
            </button>
          )}
          <button
            onClick={() => deleteCommentHandler(comment.id)}
            disabled={commentLoading}>
            delete
          </button>
          {commentError && <ErrorMessage error={commentError} />}
        </div>
      </header>
      <p>{comment.content}</p>
    </section>
  );
};
