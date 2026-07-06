import { useState } from "react";
import type { CommentsProps } from "@/types/comment.types.ts";
import { CommentView } from "../comment-view/CommentView.tsx";
import { CommentEdit } from "../comment-edit/CommentEdit.tsx";
import styles from "./Comments.module.css";

export const Comments = ({
  postId,
  comments,
  refetchComments,
}: CommentsProps) => {
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  return (
    <section className={styles.comments}>
      <h3 className={styles.commentsHeader}>Comments</h3>
      {comments &&
        comments.map((comment) => (
          <article className={styles.comment} key={comment.id}>
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
