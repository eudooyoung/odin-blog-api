import { body } from "express-validator";
import { commentLengthErr, emptyErr } from "./validate.errors.js";

export const validateComment = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage(`Comment content ${emptyErr}`)
    .bail()
    .isLength({ max: 1000 })
    .withMessage(`Comment content ${commentLengthErr}`),
];
