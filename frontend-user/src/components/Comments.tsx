import { useState } from "react";
import type { CommentsProps } from "@/types/comment.types.ts";
import { CommentView } from "./CommentView.tsx";

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
          <CommentView
            key={comment.id}
            postId={postId}
            editingCommentId={editingCommentId}
            setEditingCommentId={setEditingCommentId}
            comment={comment}
            refetchComments={refetchComments}
          />
        ))}
    </section>
  );
};
