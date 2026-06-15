export type CommentBody = {
  content: string;
};

export type CreateCommentInput = CommentBody & {
  postId: number;
  authorId: number;
};
