import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "./env.config.js";
import { findUser } from "@/repositories/user.repository.js";
import type { JwtPayload } from "jsonwebtoken";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwtSecret,
      algorithms: ["RS256"],
    },
    (payload: JwtPayload, done) => {
      void (async () => {})();
    },
  ),
);
