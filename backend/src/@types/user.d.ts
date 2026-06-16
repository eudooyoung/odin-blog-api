import type { AuthUser } from "@/types/user.types.js";

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}
