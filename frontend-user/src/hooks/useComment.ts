import { useEffect, useState } from "react";

export const useComment = (postId: number) => {
  const [commentError, setCommentError] = useState<Error | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const comments = null;
  const createComment = () => {};
  const updateComment = () => {};
  const deleteComment = () => {};
  useEffect(() => {
    const abortController = new AbortController();
    const getCommentsByPostId = async () => {
      try {
      } catch {
      } finally {
      }
    };
  }, [postId]);
  return {
    comments,
    createComment,
    updateComment,
    deleteComment,
    commentError,
    commentLoading,
  };
};
