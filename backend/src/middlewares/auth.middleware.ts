import passportConfig from "@/config/passport.config.js";
import NotAdminError from "@/errors/notAdminError.js";
import type { RequestHandler } from "express";

export const requireAuth = passportConfig.authenticate("jwt", {
  session: false,
}) as RequestHandler;

export const requireAdmin: RequestHandler[] = [
  requireAuth,
  (req, res, next) => {
    if (req.user?.role !== "ADMIN") {
      throw new NotAdminError({
        message: "Required to be Admin to post",
        statusCode: 403,
      });
    }
    next();
  },
];
