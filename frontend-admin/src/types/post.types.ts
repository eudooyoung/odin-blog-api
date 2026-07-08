import type { User } from "./types.ts";

export type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  author: Pick<User, "id" | "displayName">;
};

export type Posts = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
}[];
