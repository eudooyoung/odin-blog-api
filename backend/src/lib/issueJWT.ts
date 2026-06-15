import type { AuthUser } from "@/types/auth.types.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import fs from "node:fs";
import path from "node:path";

const PRIV_KEY = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../secrets/id_rsa_priv.pem"),
);

export const issueJWT = (user: AuthUser) => {
  const id = user.id;
  const expiresIn = "1h";
  const payload: JwtPayload = {
    sub: String(id),
    iat: Date.now(),
  };

  const token = jwt.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: "RS256",
    issuer: "odin-blog-api",
  });

  return {
    token: "Bearer " + token,
    expires: expiresIn,
  };
};
