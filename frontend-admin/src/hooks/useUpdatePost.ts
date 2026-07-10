import { env } from "@/lib/env.ts";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";
import type { PostBody } from "@/types/post.types.ts";

export const useUpdatePost = (postId: number) => {
  const { token } = useAuthContext();
  const [updatePostLoading, setUpdatePostLoading] = useState(false);
  const [updatePostError, setUpdatePostError] = useState<Error | null>(null);

  const updatePost = async (newPost: PostBody) => {
    setUpdatePostLoading(true);
    setUpdatePostError(null);

    try {
      const response = await fetch(`${env.apiBaseUrl}/admin/posts/${postId}`, {
        method: "PUT",
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
        setUpdatePostError(error);
      }
      return false;
    } finally {
      setUpdatePostLoading(false);
    }
  };

  return { updatePost, updatePostLoading, updatePostError };
};
