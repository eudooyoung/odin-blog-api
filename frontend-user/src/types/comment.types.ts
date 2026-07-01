import type { MouseEventHandler } from "react";
import type { User } from "./types.ts";
import type React from "react";

export type Comment = {
  id: number;
  content: string;
  postId: number;
  authorId: number;
  author: Pick<User, "id" | "displayName">;
};

export type CommentValidationError = {
  content?: string;
};

export type CommentBody = {
  content: string;
};

export type CommentsProps = {
  postId: number;
  comments: Comment[] | null;
  refetchComments: () => Promise<void>;
};

export type CommentViewProps = {
  postId: number;
  editingCommentId: number | null;
  setEditingCommentId: React.Dispatch<React.SetStateAction<number | null>>;
  comment: Comment;
  refetchComments: () => Promise<void>;
};

export type CommentInputProps = {
  postId: number;
  refetchComments: () => Promise<void>;
};

export type CommentEditProps = {
  comment: Comment;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onUpdate: () => void;
  refetchComments: () => Promise<void>;
};
