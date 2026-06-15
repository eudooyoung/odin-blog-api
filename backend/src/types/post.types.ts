import type { Post } from "@/generated/prisma/client.js";

export interface PostBody extends Pick<
  Post,
  "title" | "content" | "published"
> {}

export interface CreatePostInput extends PostBody {
  authorId: number;
}

export interface UpdatePostInput extends PostBody {
  id: number;
}
