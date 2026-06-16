import passportConfig from "@/config/passport.config.js";
import ForbiddenError from "@/errors/forbiddenError.js";
import RecordNotFoundError from "@/errors/recordNotFoundError.js";
import { findCommentById } from "@/repositories/comment.repository.js";
import type { RequestHandler } from "express";

export const requireAuth = passportConfig.authenticate("jwt", {
  session: false,
}) as RequestHandler;

const verifyAdmin: RequestHandler = (req, res, next) => {
  if (req.user!.role !== "ADMIN") {
    throw new ForbiddenError();
  }
  next();
};

const verifyOwner: RequestHandler = (req, res, next) => {
  const userId = Number(req.params.userId);
  if (req.user!.id !== userId) {
    throw new ForbiddenError();
  }
  next();
};

const verifyOwnerOrAdmin: RequestHandler = (req, res, next) => {
  const userId = Number(req.params.userId);
  if (req.user!.id !== userId && req.user!.role !== "ADMIN") {
    throw new ForbiddenError();
  }
  next();
};

export const verifyCommentOwner: RequestHandler = async (req, res, next) => {
  const comment = await findCommentById(Number(req.params.commentId));
  if (!comment) {
    throw new RecordNotFoundError({
      message: "Record not exists",
      statusCode: 404,
    });
  }

  if (comment.authorId !== req.user!.id) {
    throw new ForbiddenError();
  }
  next();
};

export const verifyCommentOwnerOrAdmin: RequestHandler = async (
  req,
  res,
  next,
) => {
  const comment = await findCommentById(Number(req.params.commentId));
  if (!comment) {
    throw new RecordNotFoundError({
      message: "Record not exists",
      statusCode: 404,
    });
  }

  if (comment.authorId !== req.user!.id && req.user!.role !== "ADMIN") {
    throw new ForbiddenError();
  }
  next();
};

export const requireAdmin: RequestHandler[] = [requireAuth, verifyAdmin];

export const requireOwner: RequestHandler[] = [requireAuth, verifyOwner];

export const requireOwnerOrAdmin: RequestHandler[] = [
  requireAuth,
  verifyOwnerOrAdmin,
];
