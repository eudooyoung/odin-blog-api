import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { useCommentAction } from "@/hooks/useCommentAction.ts";
import type { CommentInputProps } from "@/types/comment.types.ts";
import { useState, type SubmitEventHandler } from "react";
import { ErrorMessage } from "../ErrorMessage.tsx";
import styles from "./CommentInput.module.css";

export const CommentInput = ({
  postId,
  refetchComments,
}: CommentInputProps) => {
  const { user } = useAuthContext();
  const {
    createComment,
    commentValidationError,
    commentError,
    commentLoading,
  } = useCommentAction(postId);
  const [commentContent, setCommentContent] = useState("");

  const commentHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const success = await createComment({ content: commentContent });
    if (success) {
      setCommentContent("");
      await refetchComments();
    }
  };

  return (
    <form className={styles.commentInputForm} onSubmit={commentHandler}>
      <label htmlFor="commentContent" hidden>
        Comment
      </label>
      <textarea
        className={styles.commentInput}
        name="commentContent"
        id="commentContent"
        onChange={(e) => setCommentContent(e.target.value)}
        value={commentContent}
        placeholder={user ? "leave a comment" : "login to leave a comment"}
        disabled={user ? false : true}
        required></textarea>
      {commentValidationError && <p>{commentValidationError.content}</p>}
      <button
        className={styles.commentButton}
        type="submit"
        disabled={commentLoading || !user}>
        comment
      </button>
      {commentError && <ErrorMessage error={commentError} />}
    </form>
  );
};
