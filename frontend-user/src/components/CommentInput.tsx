import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { useComment } from "@/hooks/useComment.ts";
import { useState, type SubmitEventHandler } from "react";

export const CommentInput = () => {
  const { user } = useAuthContext();
  const { createComment, commentError, commentLoading } = useComment();
  const [commentContent, setCommentContent] = useState("");

  const commentHandler: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!commentError) {
      setCommentContent("");
    }
    await createComment({ commentContent });
  };

  return (
    <form onSubmit={commentHandler}>
      <label htmlFor="commentContet">Comment</label>
      {!user && (
        <textarea
          name=""
          id=""
          disabled
          placeholder="login to leave a comment"></textarea>
      )}
      {user && (
        <>
          <textarea
            name="commentContent"
            id="commentContet"
            onChange={(e) => setCommentContent(e.target.value)}
            value={commentContent}
            required></textarea>
          <button type="submit">comment</button>
        </>
      )}
    </form>
  );
};
