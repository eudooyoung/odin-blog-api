import { findUserByUsername } from "@/repositories/user.repository.js";
import type { AuthUser } from "@/types/user.types.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JWTStrategy } from "passport-jwt";
import fs from "node:fs";
import type { JwtPayload } from "jsonwebtoken";
import path from "node:path";
import { findUserById } from "@/repositories/user.repository.js";

// local strategy
passport.use(
  new LocalStrategy((username, password, done) => {
    void (async () => {
      try {
        const user = await findUserByUsername(username);
        if (!user) {
          return done(null, false);
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false);
        }
        const authUser: AuthUser = {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          role: user.role,
        };
        return done(null, authUser);
      } catch (error) {
        return done(error);
      }
    })();
  }),
);

// jwt strategy
const PUB_KEY = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../secrets/id_rsa_pub.pem"),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: PUB_KEY,
      algorithms: ["RS256"],
    },
    (payload: JwtPayload, done) => {
      void (async () => {
        try {
          const user = await findUserById(Number(payload.sub));
          if (!user) {
            return done(null, false);
          }
          const authUser: AuthUser = {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            role: user.role,
          };
          return done(null, authUser);
        } catch (error) {
          done(error);
        }
      })();
    },
  ),
);

export default passport;
