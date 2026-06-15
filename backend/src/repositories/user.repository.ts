import { prisma } from "@/lib/prisma.js";
import type { CreateUserInput, UpdateUserInput } from "@/types/user.types.js";

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
    omit: {
      password: true,
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

export const updateUserById = async (
  id: number,
  { displayName, password }: UpdateUserInput,
) => {
  await prisma.user.update({
    data: {
      displayName,
      password,
    },
    where: {
      id,
    },
  });
};

export const deleteUserById = async (id: number) => {
  await prisma.user.delete({
    where: {
      id,
    },
  });
};
