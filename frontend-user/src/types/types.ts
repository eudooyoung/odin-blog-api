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

export type SignupValidationError = {
  username?: string;
  password?: string;
  confirmPassword?: string;
  displayName?: string;
};

export type ValidationErrorResponse = {
  path: string;
  msg: string;
};

export type LoginBody = {
  username: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
  expires?: string;
};

export type Link = {
  name: string;
  to: string;
};

export type Links = Link[];
