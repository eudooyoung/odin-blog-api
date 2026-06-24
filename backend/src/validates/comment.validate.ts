import { body, validationResult } from "express-validator";
import { commentLengthErr, emptyErr } from "./validate.errors.js";
import type { RequestHandler } from "express";
import type { CommentBody } from "@/types/comment.types.js";

const validateComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage(`Comment content ${emptyErr}`)
    .bail()
    .isLength({ max: 1000 })
    .withMessage(`Comment content ${commentLengthErr}`),
];

const validateCommentErrorHandler: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateCommentHandler = [
  ...validateComment,
  validateCommentErrorHandler,
];
