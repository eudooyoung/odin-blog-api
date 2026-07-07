import type { SetStateAction } from "react";
import type React from "react";

export type User = {
  id: number;
  username: string;
  displayName: string;
  role: "ADMIN" | "USER";
};

export type AuthContextValue = {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  userError: Error | null;
  userLoading: boolean;
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
};

export type LoginBody = {
  username: string;
  password: string;
};
