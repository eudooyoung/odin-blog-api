import { prisma } from "@/lib/prisma.js";

export const findUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

export const findUser = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};

export const existUserByUserName = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user !== null;
};
