import type { Post } from "@/types/types.ts";

export const PostView = ({ post }: { post: Post }) => {
  return (
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
  );
};
