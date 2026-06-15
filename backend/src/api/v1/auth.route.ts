import { Router, type RequestHandler } from "express";
import passport from "@/config/passport.config.js";
import { loginHandler } from "@/controllers/auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }) as RequestHandler,
  loginHandler,
);

authRouter.get(
  "/protected",
  passport.authenticate("jwt", { session: false }) as RequestHandler,
  (req, res) => {
    res.json(req.user);
  },
);

export default authRouter;
