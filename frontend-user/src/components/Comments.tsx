import { useState } from "react";
import type { CommentsProps } from "@/types/comment.types.ts";
import { CommentView } from "./CommentView.tsx";
import { CommentEdit } from "./CommentEdit.tsx";

export const Comments = ({
  postId,
  comments,
  refetchComments,
}: CommentsProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  return (
    <section>
      <h3>Comments</h3>
      {comments &&
        comments.map((comment) => (
          <article key={comment.id}>
            {editingCommentId === comment.id ? (
              <CommentEdit
                key={comment.id}
                comment={comment}
                onCancel={() => setEditingCommentId(null)}
                onUpdate={() => setEditingCommentId(null)}
                refetchComments={refetchComments}
              />
            ) : (
              <CommentView
                key={comment.id}
                postId={postId}
                editingCommentId={editingCommentId}
                setEditingCommentId={setEditingCommentId}
                comment={comment}
                refetchComments={refetchComments}
              />
            )}
          </article>
        ))}
    </section>
  );
};
