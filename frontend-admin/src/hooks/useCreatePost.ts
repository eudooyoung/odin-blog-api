import { env } from "@/lib/env.ts";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";
import type { PostBody } from "@/types/post.types.ts";

export const useCreatePost = () => {
  const { token } = useAuthContext();
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [createPostError, setCreatePostError] = useState<Error | null>(null);

  const createPost = async (newPost: PostBody) => {
    setCreatePostLoading(true);
    setCreatePostError(null);

    try {
      const response = await fetch(`${env.apiBaseUrl}/admin/posts`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: token }),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setCreatePostError(error);
      }
      return false;
    } finally {
      setCreatePostLoading(false);
    }
  };

  return { createPost, createPostLoading, createPostError };
};
