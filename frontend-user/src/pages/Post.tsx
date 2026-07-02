import { CommentInput } from "@/components/CommentInput.tsx";
import { Comments } from "@/components/Comments.tsx";
import { ErrorMessage } from "@/components/ErrorMessage.tsx";
import { Loading } from "@/components/Loading.tsx";
import { PostView } from "@/components/PostView.tsx";
import { useComments } from "@/hooks/useComments.ts";
import { usePost } from "@/hooks/usePost.ts";
import { useParams } from "react-router";

export const Post = () => {
  const postId = Number(useParams().postId);
  const { post, postLoading, postError } = usePost(postId);
  const { comments, commentsLoading, commentsError, refetchComments } =
    useComments(postId);

  if (postLoading) return <Loading />;
  if (postError) return <ErrorMessage error={postError} />;
  if (!post) return <p>Post not found</p>;

  return (
    <>
      <h2>Post Detail</h2>
      <PostView post={post} />
      <CommentInput postId={postId} refetchComments={refetchComments} />
      {commentsLoading && <Loading />}
      {commentsError && <ErrorMessage error={commentsError} />}
      <Comments
        postId={postId}
        comments={comments}
        refetchComments={refetchComments}
      />
    </>
  );
};
