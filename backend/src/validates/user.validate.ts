import { body } from "express-validator";
import v from "./validate.errors.js";
import bcrypt from "bcryptjs";
import { existUserByUserName } from "@/repositories/user.repository.js";
import type { SignupBody } from "@/types/auth.types.js";

export const validateUser = [
  body("username")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`username ${v.emptyErr}`)
    .isEmail()
    .withMessage(`username ${v.emailErr}`)
    .isLength({ min: 6 })
    .withMessage(`username ${v.usernameMinLengthErr}`)
    .isLength({ max: 30 })
    .withMessage(`username ${v.usernameMaxLengthErr}`)
    .custom(async (username: string) => {
      const isDuplicate = await existUserByUserName(username);
      if (isDuplicate) {
        throw new Error(`username ${v.duplicateErr}`);
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .bail()
    .withMessage(`password ${v.emptyErr}`)
    .matches(/[A-Z]/)
    .withMessage(`password ${v.passwordUppercaseErr}`)
    .matches(/[0-9]/)
    .withMessage(`password ${v.passwordNumericErr}`)
    .matches(/[!@#$%^&*]/)
    .withMessage(`password ${v.passwordSpecialCharacterErr}`)
    .isLength({ min: 8 })
    .withMessage(`password ${v.passwordMinLengthErr}`)
    .isLength({ max: 72 })
    .withMessage(`password ${v.passwordMaxLengthErr}`)
    .customSanitizer(
      async (password: string) => await bcrypt.hash(password, 10),
    ),
  body("passwordConfirm")
    .trim()
    .customSanitizer(
      async (password: string) => await bcrypt.hash(password, 10),
    )
    .custom(async (passwordConfirm: string, { req }) => {
      const { password } = req.body as SignupBody;
      if (await bcrypt.compare(password, passwordConfirm)) {
        throw new Error(v.passwordConfirmNotMatchErr);
      }
    }),
];
