import type { SetStateAction } from "react";
import type React from "react";

export type Page = {
  name: string;
  to: string;
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

export type User = {
  id: number;
  username: string;
  displayName: string;
  role: "ADMIN" | "USER";
};

export type AuthContextValue = {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  userError: Error | null;
  userLoading: boolean;
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
};

export type SignupBody = {
  username: string;
  password: string;
  passwordConfirm: string;
  displayName: string;
};
