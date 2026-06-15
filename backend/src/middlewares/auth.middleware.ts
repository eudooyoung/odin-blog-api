import passportConfig from "@/config/passport.config.js";
import ForbiddenError from "@/errors/forbiddenError.js";
import type { RequestHandler } from "express";

export const requireAuth = passportConfig.authenticate("jwt", {
  session: false,
}) as RequestHandler;

const confirmAdmin: RequestHandler = (req, res, next) => {
  if (req.user!.role !== "ADMIN") {
    throw new ForbiddenError({
      message: "Permission denied",
      statusCode: 403,
    });
  }
  next();
};

const confirmSelf: RequestHandler = (req, res, next) => {
  const userId = Number(req.params.userId);
  if (req.user!.id !== userId) {
    throw new ForbiddenError({
      message: "Permission denied",
      statusCode: 403,
    });
  }
  next();
};

const confirmAdminOrSelf: RequestHandler = (req, res, next) => {
  const userId = Number(req.params.userId);
  if (req.user!.id !== userId && req.user!.role !== "ADMIN") {
    throw new ForbiddenError({
      message: "Permission denied",
      statusCode: 403,
    });
  }
  next();
};

export const requireAdmin: RequestHandler[] = [requireAuth, confirmAdmin];

export const requireSelf: RequestHandler[] = [requireAuth, confirmSelf];

export const requireSelfOrAdmin: RequestHandler[] = [
  requireAuth,
  confirmAdminOrSelf,
];
