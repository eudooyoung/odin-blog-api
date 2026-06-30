import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { useComments } from "@/hooks/useComments.ts";
import { useState } from "react";
import { CommentEdit } from "./CommentEdit.tsx";
import { useCommentAction } from "@/hooks/useCommentAction.ts";

export const Comments = ({ postId }: { postId: number }) => {
  const { user } = useAuthContext();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const { comments } = useComments(postId);
  const { deleteComment } = useCommentAction();

  const deleteCommentHandler = async () => {
    await deleteComment();
  };

  const cancelButtonHandler = () => {
    setEditingCommentId(null);
  };

  return (
    <section>
      <h3>Comments</h3>
      {comments &&
        comments.map((comment) => (
          <article key={comment.id}>
            {editingCommentId === comment.id ? (
              <CommentEdit
                commentContent={comment.content}
                onCancel={cancelButtonHandler}
              />
            ) : (
              <>
                <p>{comment.content}</p>
                <p>{comment.author.displayName}</p>
              </>
            )}

            {user?.id === comment.author.id &&
              editingCommentId !== comment.id && (
                <button onClick={() => setEditingCommentId(comment.id)}>
                  edit
                </button>
              )}
            {user?.id === comment.author.id && (
              <button onClick={deleteCommentHandler}>delete</button>
            )}
          </article>
        ))}
    </section>
  );
};
