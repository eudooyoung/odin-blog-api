import { findUser, findUsers } from "@/repositories/user.repository.js";
import { validateUser } from "@/validates/user.validate.js";
import type { RequestHandler } from "express";

export const getUsers: RequestHandler = async (req, res) => {
  const users = await findUsers();
  res.json(users);
};

export const getUser: RequestHandler = async (req, res) => {
  const { userId } = req.params;
  const user = await findUser(Number(userId));
  res.json(user);
};

const createUserHandler: RequestHandler = async (req, res) => {};

export const createUser = [...validateUser, createUserHandler];
