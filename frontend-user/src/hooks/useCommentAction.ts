import { env } from "@/lib/env.ts";
import { fetchWithAuth } from "@/lib/fetchWithAuth.ts";
import { type ValidationErrorResponse } from "@/types/types.ts";
import { useState } from "react";
import { useAuthContext } from "./useAuthContext.ts";
import type {
  CommentBody,
  CommentValidationError,
} from "@/types/comment.types.ts";

export const useCommentAction = (postId: number) => {
  const { token } = useAuthContext();
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentValidationError, setCommentValidationError] =
    useState<CommentValidationError>({});
  const [commentError, setCommentError] = useState<Error | null>(null);

  const createComment = async (comment: CommentBody) => {
    setCommentLoading(true);
    setCommentValidationError({});
    setCommentError(null);

    try {
      const response = await fetchWithAuth(
        `${env.apiBaseUrl}/posts/${postId}/comments`,
        {
          method: "post",
          headers: {
            ...(token && { Authorization: token }),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(comment),
        },
      );

      if (!response.ok) {
        if (response.status === 400) {
          const { errors }: { errors: ValidationErrorResponse[] } =
            await response.json();
          const errorSource = errors.map((error) => [error.path, error.msg]);
          setCommentValidationError(Object.fromEntries(errorSource));
        } else {
          const { error } = await response.json();
          setCommentError(error);
        }
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        setCommentError(error);
      }
    } finally {
      setCommentLoading(false);
    }
  };

  const updateComment = async (commentId: number, newComment: CommentBody) => {
    setCommentLoading(true);
    setCommentValidationError({});
    setCommentError(null);

    try {
      const response = await fetchWithAuth(
        `${env.apiBaseUrl}/posts/${postId}/comments/${commentId}`,
        {
          method: "put",
          headers: {
            ...(token && { Authorization: token }),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newComment),
        },
      );

      if (!response.ok) {
        if (response.status === 400) {
          const { errors }: { errors: ValidationErrorResponse[] } =
            await response.json();
          const errorSource = errors.map((error) => [error.path, error.msg]);
          setCommentValidationError(Object.fromEntries(errorSource));
        } else {
          const { error } = await response.json();
          setCommentError(error);
        }
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        setCommentError(error);
      }
    } finally {
      setCommentLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    setCommentLoading(true);
    setCommentError(null);

    try {
      const response = await fetchWithAuth(
        `${env.apiBaseUrl}/posts/${postId}/comments/${commentId}`,
        {
          method: "delete",
          headers: {
            ...(token && { Authorization: token }),
          },
        },
      );

      if (!response.ok) {
        const { error } = await response.json();
        setCommentError(error);
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        setCommentError(error);
      }
    } finally {
      setCommentLoading(false);
    }
  };

  return {
    createComment,
    updateComment,
    deleteComment,
    commentLoading,
    commentValidationError,
    commentError,
  };
};
