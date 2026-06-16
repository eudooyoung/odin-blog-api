import { Router, type RequestHandler } from "express";
import passport from "@/config/passport.config.js";
import { loginHandler } from "@/controllers/auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }) as RequestHandler,
  loginHandler,
);

export default authRouter;
