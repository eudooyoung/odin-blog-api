import { env } from "@/lib/env.ts";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";

export const useDeletePost = (postId: number) => {
  const { token } = useAuthContext();
  const [deletePostLoading, setDeletePostLoading] = useState(false);
  const [deletePostError, setDeletePostError] = useState<Error | null>(null);

  const deletePost = async () => {
    setDeletePostLoading(true);
    setDeletePostError(null);

    try {
      const response = await fetch(`${env.apiBaseUrl}/admin/posts/${postId}`, {
        method: "DELETE",
        headers: {
          ...(token && { Authorization: token }),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setDeletePostError(error);
      }
      return false;
    } finally {
      setDeletePostLoading(false);
    }
  };

  return { deletePost, deletePostLoading, deletePostError };
};
