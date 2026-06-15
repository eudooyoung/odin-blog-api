import type { User } from "@/generated/prisma/client.js";

export type AuthUser = Pick<User, "id" | "username" | "displayName" | "role">;

export type UserBody = Pick<User, "username" | "password" | "displayName"> & {
  passwordConfirm: string;
};

export type CreateUserInput = Omit<UserBody, "passwordConfirm">;

export type UpdateUserBody = Omit<UserBody, "username">;

export type UpdateUserInput = Omit<UpdateUserBody, "passwordConfirm">;
