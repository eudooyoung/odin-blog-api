import { Comments } from "@/components/comments/Comments";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loading } from "@/components/Loading";
import { PostView } from "@/components/post-view/PostView";
import { useComments } from "@/hooks/useComments.ts";
import { usePost } from "@/hooks/usePost.ts";
import { useParams } from "react-router";
import styles from "./Post.module.css";
import { useState } from "react";
import { PostEdit } from "@/components/post-edit/PostEdit.tsx";

export const Post = () => {
  const postId = Number(useParams().postId);
  const { post, postLoading, postError, refetchPost } = usePost(postId);
  const { comments, commentsLoading, commentsError, refetchComments } =
    useComments(postId);
  const [isEdit, setIsEdit] = useState(false);

  if (postLoading) return <Loading />;
  if (postError) return <ErrorMessage error={postError} />;
  if (!post) return;

  return (
    <section className={styles.post}>
      {!isEdit ? (
        <PostView post={post} onEdit={() => setIsEdit(true)} />
      ) : (
        <PostEdit
          post={post}
          onCancel={() => setIsEdit(false)}
          onUpdate={() => {
            setIsEdit(false);
            refetchPost();
          }}
        />
      )}
      {commentsLoading && <Loading />}
      {commentsError && <ErrorMessage error={commentsError} />}
      <Comments
        postId={postId}
        comments={comments}
        refetchComments={refetchComments}
      />
    </section>
  );
};
