import type { AuthContextValue } from "@/types/types.ts";
import { createContext } from "react";

export const AuthContext = createContext({} as AuthContextValue);
