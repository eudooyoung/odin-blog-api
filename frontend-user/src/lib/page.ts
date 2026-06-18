import type { Page } from "@/types/types.ts";

const common: Page[] = [{ name: "home", to: "/" }];

export const publicPages: Page[] = [
  ...common,
  { name: "login", to: "/login" },
  { name: "signup", to: "/signup" },
];

export const authPages: Page[] = [
  ...common,
  { name: "dashboard", to: "/dashboard" },
];
