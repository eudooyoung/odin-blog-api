import type { AuthContextValue } from "@/types/types.ts";
import { createContext } from "react";

export const AuthContext = createContext<AuthContextValue | null>(null);
