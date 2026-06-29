import { usePosts } from "@/hooks/usePosts";
import { Link } from "react-router";

const Posts = () => {
  const { posts, postsError, postsLoading } = usePosts();

  return (
    <section>
      <h3>Posts</h3>
      {postsLoading && <span>loading...</span>}
      {postsError && <span>{postsError.message}</span>}
      {posts && (
        <div>
          {posts.map((post) => (
            <section key={post.id}>
              <h4>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
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
      )}
    </section>
  );
};

export default Posts;
