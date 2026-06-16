import { prisma } from "@/lib/prisma.js";
import type { CreateCommentInput } from "@/types/comment.types.js";

export const createCommentByPostAndUserId = async ({
  content,
  postId,
  authorId,
}: CreateCommentInput) => {
  const commentId = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId,
    },
    select: {
      id: true,
    },
  });
  return commentId;
};

export const findAllComments = async () => {
  const comments = await prisma.comment.findMany();
  return comments;
};

export const findCommentsByPostId = async (postId: number) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: {
        select: {
          displayName: true,
        },
      },
    },
  });
  return comments;
};

export const findCommentById = async (id: number) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });
  return comment;
};

export const updateCommentById = async (id: number, content: string) => {
  await prisma.comment.update({
    data: {
      content,
    },
    where: {
      id,
    },
  });
};

export const deleteCommentById = async (id: number) => {
  await prisma.comment.delete({
    where: {
      id,
    },
  });
};
