import { CommentInput } from "@/components/comment-input/CommentInput";
import { Comments } from "@/components/comments/Comments";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Loading } from "@/components/Loading";
import { PostView } from "@/components/post-view/PostView";
import { useComments } from "@/hooks/useComments.ts";
import { usePost } from "@/hooks/usePost.ts";
import { useParams } from "react-router";
import styles from "./Post.module.css";

export const Post = () => {
  const postId = Number(useParams().postId);
  const { post, postLoading, postError } = usePost(postId);
  const { comments, commentsLoading, commentsError, refetchComments } =
    useComments(postId);

  if (postLoading) return <Loading />;
  if (postError) return <ErrorMessage error={postError} />;
  if (!post) return;

  return (
    <section className={styles.post}>
      {post && <PostView post={post} />}
      <CommentInput postId={postId} refetchComments={refetchComments} />
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
