import type { Links } from "@/types/types.ts";

const common: Links = [{ name: "home", to: "/" }];

export const publicLinks: Links = [
  ...common,
  { name: "login", to: "/login" },
  { name: "signup", to: "/signup" },
];

export const authLinks: Links = [
  ...common,
  { name: "profile", to: "/profile" },
];
