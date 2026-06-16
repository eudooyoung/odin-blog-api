import { env } from "@/config/env";
import type { Post } from "@/types/types.ts";
import { useEffect, useState } from "react";

const Home = () => {
  const { posts, postError, postLoading } = useBlogApi();
  console.log(posts);

  return (
    <>
      <h2>Home</h2>
      <section>
        <h3>Posts</h3>
        {postLoading && <span>loading...</span>}
        {postError && <span>{postError.message}</span>}
        <div>
          {posts.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))}
        </div>
      </section>
    </>
  );
};

const useBlogApi = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postError, setPostError] = useState<Error | null>(null);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${env.apiBaseUrl}/posts`, {
          method: "get",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Server Error: ${response.status}`);
        }

        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return;
          }
          setPostError(error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setPostLoading(false);
        }
      }
    };

    void fetchPosts();

    return () => {
      controller.abort();
    };
  }, []);

  return { posts, postError, postLoading };
};

export default Home;
