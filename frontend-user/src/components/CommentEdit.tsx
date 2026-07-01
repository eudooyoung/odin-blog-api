import { useCommentAction } from "@/hooks/useCommentAction.ts";
import type { CommentEditProp } from "@/types/comment.types.ts";
import { useState, type SubmitEventHandler } from "react";

export const CommentEdit = ({ comment, onCancel }: CommentEditProp) => {
  const { updateComment, commentError, commentLoading } = useCommentAction(
    comment.id,
  );
  const [newCommentContent, setNewCommentContent] = useState(comment.content);

  const editCommentHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateComment(comment.id, { commentContent: newCommentContent });
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
      <button>post</button>
      <button onClick={onCancel}>cancel</button>
    </form>
  );
};
