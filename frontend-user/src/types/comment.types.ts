import type { MouseEventHandler } from "react";
import type { User } from "./types.ts";

export type Comment = {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  author: Pick<User, "id" | "displayName">;
};

export type Comments = Comment[];

export type CommentValidationError = {
  content?: string;
};

export type CommentBody = {
  commentContent: string;
};

export type CommentEditProp = {
  comment: Comment;
  onCancel: MouseEventHandler<HTMLButtonElement>;
};
