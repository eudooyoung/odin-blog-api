import { env } from "@/lib/env.ts";
import type { Post } from "@/types/post.types.ts";
import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";

export const usePost = (postId: number) => {
  const [post, setPost] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState<Error | null>(null);
  const { token } = useAuthContext();

  useEffect(() => {
    const abortController = new AbortController();

    const getPost = async () => {
      try {
        const response = await fetch(
          `${env.apiBaseUrl}/admin/posts/${postId}`,
          {
            method: "get",
            signal: abortController.signal,
            headers: token ? { Authorization: token } : {},
          },
        );

        if (!response.ok) {
          const { error } = await response.json();
          setPostError(error);
          return;
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
  }, [postId, token]);
  return { post, postLoading, postError };
};
