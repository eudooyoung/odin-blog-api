import { env } from "@/lib/env.ts";
import type { Posts } from "@/types/types.ts";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";

export const usePosts = () => {
  const [posts, setPosts] = useState<Posts | null>(null);
  const [postsError, setPostsError] = useState<Error | null>(null);
  const [postsLoading, setPostsLoading] = useState(true);
  const { token } = useAuthContext();

  useEffect(() => {
    const abortController = new AbortController();

    void (async () => {
      try {
        const response = await fetch(`${env.apiBaseUrl}/admin/posts`, {
          method: "get",
          signal: abortController.signal,
          headers: token ? { Authorization: token } : {},
        });

        if (!response.ok) {
          const { error } = await response.json();
          setPostsError(error);
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
        if (!abortController.signal.aborted) {
          setPostsLoading(false);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return { posts, postsError, postsLoading };
};
