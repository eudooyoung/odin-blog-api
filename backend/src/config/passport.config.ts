import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { env } from "./env.config.js";
import { findUser } from "@/repositories/user.repository.js";

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: env.jwtSecret,
    },
    (jwt_payload, done) => {
      void (async () => {
        const user = findUser(jwt_payload);
      })();
    },
  ),
);
