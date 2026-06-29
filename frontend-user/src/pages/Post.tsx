import { CommentInput } from "@/components/CommentInput.tsx";
import { Comments } from "@/components/Comments.tsx";
import { usePost } from "@/hooks/usePost.ts";

export const Post = () => {
  const { post } = usePost();
  return (
    <>
      <h2>Post Detail</h2>
      <article>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <p>
          {new Intl.DateTimeFormat("ko-KR", {
            dateStyle: "short",
          }).format(new Date(post.createdAt))}
        </p>
        <footer>{post.author}</footer>
      </article>
      <CommentInput />
      <Comments comments={post.comments} />
    </>
  );
};
