import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import fs from "node:fs";
import type { JwtPayload } from "jsonwebtoken";
import path from "node:path";
import { findUser } from "@/repositories/user.repository.js";

const PUB_KEY = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../secrets/id_rsa_pub.pem"),
);

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: PUB_KEY,
      algorithms: ["RS256"],
    },
    (payload: JwtPayload, done) => {
      void (async () => {
        try {
          const user = await findUser(Number(payload.sub));
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          done(error);
        }
      })();
    },
  ),
);
