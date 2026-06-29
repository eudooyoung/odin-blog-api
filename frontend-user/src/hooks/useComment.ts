import { useState } from "react";

export const useComment = () => {
  const [commentError, setCommentError] = useState<Error | null>(null);
  const [commentLoading, setCommentLoading] = useState(false);
  const comment = () => {};
  const updateComment = () => {};
  const deleteComment = () => {};
  return {
    comment,
    updateComment,
    deleteComment,
    commentError,
    commentLoading,
  };
};
