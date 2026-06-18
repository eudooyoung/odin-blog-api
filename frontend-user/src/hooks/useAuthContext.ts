import { AuthContext } from "@/contexts/authContext.ts";
import { useContext } from "react";

export const useAuthContext = () => {
  return useContext(AuthContext);
};
