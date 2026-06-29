import { CommentInput } from "@/components/CommentInput.tsx";
import { Comments } from "@/components/Comments.tsx";
import { usePost } from "@/hooks/usePost.ts";
import { useParams } from "react-router";

export const Post = () => {
  const postId = Number(useParams().postId);
  const { post } = usePost(postId);
  return (
    <>
      <h2>Post Detail</h2>
      {post && (
        <article>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>
            {new Intl.DateTimeFormat("ko-KR", {
              dateStyle: "short",
            }).format(new Date(post.createdAt))}
          </p>
          <footer>{post.author.displayName}</footer>
        </article>
      )}

      <CommentInput />
      <Comments postId={postId} />
    </>
  );
};
