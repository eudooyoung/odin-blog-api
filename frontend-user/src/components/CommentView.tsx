import { useAuthContext } from "@/hooks/useAuthContext.ts";
import type { Comment } from "@/types/types.ts";
import { useState } from "react";
import { CommentEdit } from "./CommentEdit.tsx";
import { useCommentAction } from "@/hooks/useCommentAction.ts";

export const CommentView = ({ comment }: { comment: Comment }) => {
  const { user } = useAuthContext();
  const { deleteComment } = useCommentAction();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const cancelButtonHandler = () => {
    setEditingCommentId(null);
  };

  const deleteCommentHandler = async () => {
    await deleteComment();
  };

  return (
    <article>
      <div>
        <p>{comment.content}</p>
        <p>{comment.author.displayName}</p>
      </div>

      {user?.id === comment.author.id && editingCommentId !== comment.id && (
        <button onClick={() => setEditingCommentId(comment.id)}>edit</button>
      )}
      {user?.id === comment.author.id && (
        <button onClick={deleteCommentHandler}>delete</button>
      )}
    </article>
  );
};
