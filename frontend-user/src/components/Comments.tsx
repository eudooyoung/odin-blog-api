import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { useComment } from "@/hooks/useComment.ts";
import { useState, type MouseEventHandler } from "react";
import { CommentEdit } from "./CommentEdit.tsx";

export const Comments = ({ postId }: { postId: number }) => {
  const { user } = useAuthContext();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const { comments, deleteComment } = useComment(postId);

  const deleteCommentHandler = async () => {
    await deleteComment();
  };

  const cancelButtonHandler = () => {
    setEditingCommentId(null);
  };

  return (
    <section>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <article key={comment.id}>
          {editingCommentId === comment.id ? (
            <CommentEdit
              commentContent={comment.content}
              onCancel={cancelButtonHandler}
            />
          ) : (
            <>
              <p>{comment.content}</p>
              <p>{comment.author}</p>
            </>
          )}

          {user?.id === comment.authorId &&
            setEditingCommentId !== comment.id && (
              <button onClick={() => setEditingCommentId(comment.id)}>
                edit
              </button>
            )}
          {user?.id === comment.authorId && (
            <button onClick={deleteCommentHandler}>delete</button>
          )}
        </article>
      ))}
    </section>
  );
};
