import type { User } from "@/generated/prisma/client.js";

export interface SignupBody extends Pick<
  User,
  "username" | "password" | "displayName"
> {
  passwordConfirm: string;
}

export interface CreateUserInput extends Omit<SignupBody, "passwordConfirm"> {}

export interface AuthUser extends Pick<
  User,
  "id" | "username" | "displayName"
> {}
