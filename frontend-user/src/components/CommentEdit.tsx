import { useCommentAction } from "@/hooks/useCommentAction.ts";
import type { CommentEditProps } from "@/types/comment.types.ts";
import { useState, type SubmitEventHandler } from "react";
import { ErrorMessage } from "./ErrorMessage.tsx";

export const CommentEdit = ({
  comment,
  onCancel,
  onUpdate,
  refetchComments,
}: CommentEditProps) => {
  const {
    updateComment,
    commentError,
    commentValidationError,
    commentLoading,
  } = useCommentAction(comment.id);
  const [newCommentContent, setNewCommentContent] = useState(comment.content);

  const editCommentHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const success = await updateComment(comment.id, {
      content: newCommentContent,
    });
    if (success) {
      await refetchComments();
      setNewCommentContent("");
      onUpdate();
    }
  };

  return (
    <form onSubmit={editCommentHandler}>
      <label htmlFor="editCommentContent">edit comment</label>
      <textarea
        name="editCommentContent"
        id="editCommentContent"
        onChange={(e) => setNewCommentContent(e.target.value)}
        value={newCommentContent}
        required></textarea>
      {commentValidationError && <p>{commentValidationError.content}</p>}
      <button type="submit" disabled={commentLoading}>
        post
      </button>
      <button onClick={onCancel}>cancel</button>
      {commentError && <ErrorMessage error={commentError} />}
    </form>
  );
};
