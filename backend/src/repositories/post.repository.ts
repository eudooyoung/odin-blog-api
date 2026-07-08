import { prisma } from "@/lib/prisma.js";
import type {
  CreatePostInput,
  UpdatePostInput,
  UpdatePostPublishedInput,
} from "@/types/post.types.js";

export const findAllPublishedPosts = async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      id: "desc",
    },
  });
  return posts;
};

export const findAllPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      id: "desc",
    },
  });
  return posts;
};

export const createPostByUserId = async ({
  title,
  content,
  published,
  authorId,
}: CreatePostInput) => {
  const createdId = await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
    },
    select: {
      id: true,
    },
  });
  return createdId;
};

export const findPublishedPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
      published: true,
    },
    omit: {
      published: true,
    },
    include: {
      author: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
  });
  return post;
};

export const findPostById = async (id: number) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
  });
  return post;
};

export const updatePostById = async ({
  id,
  title,
  content,
  published,
}: UpdatePostInput) => {
  const updatedId = await prisma.post.update({
    data: {
      title,
      content,
      published,
    },
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  return updatedId;
};

export const updatePostPublishedById = async ({
  id,
  published,
}: UpdatePostPublishedInput) => {
  const updatedId = await prisma.post.update({
    data: {
      published,
    },
    where: {
      id,
    },
    select: {
      id: true,
    },
  });
  return updatedId;
};

export const deletePostById = async (id: number) => {
  await prisma.post.delete({
    where: {
      id,
    },
  });
};
