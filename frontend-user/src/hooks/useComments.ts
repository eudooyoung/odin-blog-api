import { env } from "@/lib/env.ts";
import type { Comment } from "@/types/comment.types.ts";
import { useEffect, useState } from "react";

export const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [commentsError, setCommentsError] = useState<Error | null>(null);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const refetchComments = async () => {
    setCommentsLoading(true);
    try {
      const response = await fetch(
        `${env.apiBaseUrl}/posts/${postId}/comments`,
        {
          method: "get",
        },
      );

      if (!response.ok) {
        const { error } = await response.json();
        setCommentsError(error);
        return;
      }

      const comments = await response.json();
      setComments(comments);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        setCommentsError(error);
      }
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchComment = async () => {
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
          setCommentsError(error);
          return;
        }

        const comments = await response.json();
        setComments(comments);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setCommentsError(error);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setCommentsLoading(false);
        }
      }
    };

    fetchComment();

    return () => {
      abortController.abort();
    };
  }, [postId]);

  return {
    comments,
    commentsError,
    commentsLoading,
    refetchComments,
  };
};
