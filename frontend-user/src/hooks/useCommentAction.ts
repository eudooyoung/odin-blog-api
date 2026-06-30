import { env } from "@/lib/env.ts";
import { fetchWithAuth } from "@/lib/fetchWithAuth.ts";
import { type CommentValidationError } from "@/types/types.ts";
import { useState } from "react";
import { useParams } from "react-router";

export const useCommentAction = () => {
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentValidationError, setCommentValidationError] =
    useState<CommentValidationError>({});
  const [commentError, setCommentError] = useState<Error | null>(null);
  const postId = Number(useParams().postId);

  const createComment = async () => {
    try {
      const response = await fetchWithAuth(
        `${env.apiBaseUrl}/posts/${postId}/comments`,
        {
          method: "post",
        },
      );
    } catch {}
  };
  const updateComment = () => {};
  const deleteComment = () => {};
  return {
    createComment,
    updateComment,
    deleteComment,
    commentLoading,
    commentValidationError,
    commentError,
  };
};
