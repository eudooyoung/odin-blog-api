import { useAuthContext } from "@/hooks/useAuthContext.ts";
import { CommentEdit } from "./CommentEdit.tsx";
import { useCommentAction } from "@/hooks/useCommentAction.ts";
import type { CommentViewProps } from "@/types/comment.types.ts";
import { ErrorMessage } from "./ErrorMessage.tsx";

export const CommentView = ({
  postId,
  editingCommentId,
  setEditingCommentId,
  comment,
  refetchComments,
}: CommentViewProps) => {
  const { user } = useAuthContext();
  const { deleteComment, commentError, commentLoading } =
    useCommentAction(postId);

  const deleteCommentHandler = async (commentId: number) => {
    const success = await deleteComment(commentId);
    if (success) {
      await refetchComments();
    }
  };

  return (
    <article>
      {editingCommentId === comment.id ? (
        <CommentEdit
          comment={comment}
          onCancel={() => setEditingCommentId(null)}
          onUpdate={() => setEditingCommentId(null)}
          refetchComments={refetchComments}
        />
      ) : (
        <>
          <p>{comment.content}</p>
          <p>{comment.author.displayName}</p>
        </>
      )}

      {user?.id === comment.author.id && editingCommentId !== comment.id && (
        <button onClick={() => setEditingCommentId(comment.id)}>edit</button>
      )}
      {user?.id === comment.author.id && (
        <>
          <button
            onClick={() => deleteCommentHandler(comment.id)}
            disabled={commentLoading}>
            delete
          </button>
          {commentError && <ErrorMessage error={commentError} />}
        </>
      )}
    </article>
  );
};
