import { CommentInput } from "@/components/CommentInput.tsx";
import { Comments } from "@/components/Comments.tsx";
import { ErrorMessage } from "@/components/ErrorMessage.tsx";
import { Loading } from "@/components/Loading.tsx";
import { PostView } from "@/components/PostView.tsx";
import { usePost } from "@/hooks/usePost.ts";
import { useParams } from "react-router";

export const Post = () => {
  const postId = Number(useParams().postId);
  const { post, postLoading, postError } = usePost(postId);

  if (postLoading) return <Loading />;
  if (postError) return <ErrorMessage error={postError} />;
  if (!post) return <p>Post not found</p>;

  return (
    <>
      <h2>Post Detail</h2>
      <PostView post={post} />
      <CommentInput />
      <Comments postId={postId} />
    </>
  );
};
