import { useAsync } from "@/hooks/useAsync.ts";
import { env } from "@/lib/env.ts";
import type { Posts } from "@/types/types.ts";

const PostList = () => {
  const {
    data: posts,
    error: postError,
    loading: postLoading,
  } = useAsync<Posts>(`${env.apiBaseUrl}/posts`);

  return (
    <section>
      <h3>Posts</h3>
      {postLoading && <span>loading...</span>}
      {postError && <span>{postError.message}</span>}
      <div>
        {posts &&
          posts.map((post) => (
            <section key={post.id}>
              <h4>
                <a href="">{post.title}</a>
              </h4>
              <p>{post.content}</p>
              <footer>
                {new Intl.DateTimeFormat("ko-KR", {
                  dateStyle: "short",
                }).format(new Date(post.createdAt))}
              </footer>
            </section>
          ))}
      </div>
    </section>
  );
};

export default PostList;
