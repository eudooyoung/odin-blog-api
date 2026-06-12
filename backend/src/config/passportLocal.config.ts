import { findUserByUsername } from "@/repositories/user.repository.js";
import type { AuthUser } from "@/types/auth.types.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
  new Strategy((username, password, done) => {
    void (async () => {
      try {
        const user = await findUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        const authUser: AuthUser = {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
        };
        return done(null, authUser);
      } catch (error) {
        return done(error);
      }
    })();
  }),
);

export default passport;
