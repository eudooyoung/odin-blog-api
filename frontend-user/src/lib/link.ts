import type { Links } from "@/types/types.ts";

const common: Links = [{ name: "Home", to: "/" }];

export const publicLinks: Links = [
  ...common,
  { name: "Login", to: "/login" },
  { name: "Signup", to: "/signup" },
];

export const authLinks: Links = [
  ...common,
  { name: "Profile", to: "/profile" },
];
