import { env } from "@/lib/env.ts";
import type { Post } from "@/types/types.ts";
import { useEffect, useState } from "react";

export const usePost = (postId: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState<Error | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const getPost = async () => {
      try {
        const response = await fetch(`${env.apiBaseUrl}/posts/${postId}`, {
          method: "get",
          signal: abortController.signal,
        });

        if (!response.ok) {
          const { error } = await response.json();
          setPostError(error);
        }

        const post = await response.json();
        setPost(post);
      } catch (error) {
        if (error instanceof Error) {
          if (error.name === "AbortError") {
            return;
          }
          setPostError(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setPostLoading(false);
        }
      }
    };

    getPost();

    return () => {
      abortController.abort();
    };
  }, [postId]);
  return { post, postLoading, postError };
};
