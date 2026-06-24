import { Router, type RequestHandler } from "express";
import passport from "@/config/passport.config.js";
import { getStatus, loginHandler } from "@/controllers/auth.controller.js";
import { requireAuth } from "@/middlewares/auth.middleware.js";

const authRouter = Router();

authRouter
  .get("/status", requireAuth, getStatus)
  .post(
    "/login",
    passport.authenticate("local", { session: false }) as RequestHandler,
    loginHandler,
  );

export default authRouter;
