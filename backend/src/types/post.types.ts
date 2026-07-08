import type { Post } from "@/generated/prisma/client.js";

export type PostBody = Pick<Post, "title" | "content" | "published">;

export type CreatePostInput = PostBody & {
  authorId: number;
};

export type UpdatePostInput = PostBody & {
  id: number;
};

export type UpdatePostPublishedInput = {
  id: number;
  published: boolean;
};
