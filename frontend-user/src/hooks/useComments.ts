import { env } from "@/lib/env.ts";
import type { Comments } from "@/types/comment.types.ts";
import { useEffect, useState } from "react";

export const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comments | null>(null);
  const [commentsError, setCommentError] = useState<Error | null>(null);
  const [commentsLoading, setCommentLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const getCommentsByPostId = async () => {
      try {
        const response = await fetch(
          `${env.apiBaseUrl}/posts/${postId}/comments`,
          {
            method: "get",
            signal: abortController.signal,
          },
        );

        if (!response.ok) {
          const { error } = await response.json();
          setCommentError(error);
          return;
        }

        const comments = await response.json();
        setComments(comments);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setCommentError(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setCommentLoading(false);
        }
      }
    };

    getCommentsByPostId();

    return () => {
      abortController.abort();
    };
  }, [postId]);
  return {
    comments,
    commentsError,
    commentsLoading,
  };
};
