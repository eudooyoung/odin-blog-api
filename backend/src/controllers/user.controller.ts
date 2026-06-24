import {
  createUser,
  deleteUserById,
  findUserById,
  findUsers,
  updateUserById,
} from "@/repositories/user.repository.js";
import type {
  CreateUserInput,
  UpdateUserBody,
  UpdateUserInput,
  UserBody,
} from "@/types/user.types.js";
import {
  validateCreateUser,
  validateUpdateUser,
} from "@/validates/user.validate.js";
import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";

export const getAllUsers: RequestHandler = async (req, res) => {
  const users = await findUsers();
  res.json(users);
};

export const getUser: RequestHandler = async (req, res) => {
  const user = await findUserById(Number(req.params.userId));
  res.json(user);
};

const insertUserHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { username, password, displayName }: CreateUserInput = matchedData(req);
  const user = await createUser({ username, password, displayName });
  res.status(201).json(user);
};

export const insertUser = [...validateCreateUser, insertUserHandler];

const updateUserHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userInput: UpdateUserInput = matchedData(req);
  await updateUserById(req.user!.id, userInput);
  res.sendStatus(204);
};

export const updateUser = [...validateUpdateUser, updateUserHandler];

export const deleteUser: RequestHandler = async (req, res) => {
  await deleteUserById(req.user!.id);
  res.sendStatus(204);
};
