import { prisma } from "@/lib/prisma.js";
import type { CreateUserInput } from "@/types/auth.types.js";

export const findUsers = async () => {
  const users = await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
  return users;
};

export const findUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

export const existUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user !== null;
};

export const createUser = async ({
  username,
  password,
  displayName,
}: CreateUserInput) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      displayName,
    },
    select: {
      username: true,
      displayName: true,
    },
  });
  return user;
};

export const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};
