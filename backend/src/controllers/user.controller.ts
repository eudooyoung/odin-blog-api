import { createUser, findUsers } from "@/repositories/user.repository.js";
import type { CreateUserInput, SignupBody } from "@/types/auth.types.js";
import { validateUser } from "@/validates/user.validate.js";
import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await findUsers();
  res.json(users);
};

const insertUserHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), prev: req.body as SignupBody });
  }
  const { username, password, displayName }: CreateUserInput = matchedData(req);
  const user = await createUser({ username, password, displayName });
  res.status(201).json(user);
};

export const insertUser = [...validateUser, insertUserHandler];
