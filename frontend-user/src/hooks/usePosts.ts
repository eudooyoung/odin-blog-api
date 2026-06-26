import { env } from "@/lib/env.ts";
import type { Posts } from "@/types/types.ts";
import { useEffect, useState } from "react";

export const usePosts = () => {
  const [posts, setPosts] = useState<Posts | null>(null);
  const [postsError, setPostsError] = useState<Error | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    const abrtController = new AbortController();

    void (async () => {
      try {
        const response = await fetch(`${env.apiBaseUrl}/posts`, {
          method: "get",
          signal: abrtController.signal,
        });

        if (!response.ok) {
          throw new Error(`Http Error: Status ${response.status}`);
        }

        const data = await response.json();

        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return;
          }
          setPostsError(error);
        }
      } finally {
        if (!abrtController.signal.aborted) {
          setPostsLoading(false);
        }
      }
    })();

    return () => {
      abrtController.abort();
    };
  }, []);

  return { posts, postsError, postsLoading };
};
