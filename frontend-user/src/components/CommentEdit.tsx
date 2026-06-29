import { useComment } from "@/hooks/useComment.ts";
import { useState, type SubmitEventHandler } from "react";

export const CommentEdit = ({ commentContent, onCancel }) => {
  const { updateComment, commentError, commentLoading } = useComment();
  const [newCommentContent, setNewCommentContent] = useState(commentContent);

  const editCommentHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await updateComment({ newCommentContent });
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
