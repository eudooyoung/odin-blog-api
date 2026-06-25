import type { SetStateAction } from "react";
import type React from "react";

export type FetchWithAuthOption = {
  method: string;
  signal?: AbortSignal;
  headers?: HeadersInit;
};

export type AuthContextValue = {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  userError: Error | null;
  userLoading: boolean;
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
};

export type User = {
  id: number;
  username: string;
  displayName: string;
  role: "ADMIN" | "USER";
};

export type Link = {
  name: string;
  to: string;
};

export type Links = Link[];

export type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  authorId: number;
};

export type Posts = Post[];

export type SignupBody = {
  username: string;
  password: string;
  confirmPassword: string;
  displayName: string;
};

export type SignupError = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  displayName?: string;
};

export type ValidationError = {
  path: string;
  msg: string;
};
