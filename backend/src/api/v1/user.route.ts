import {
  createUser,
  getUser,
  getUsers,
} from "@/controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter
  .get("/", getUsers)
  .get("/:userId", getUser)
  .post("/:userId", createUser);

export default userRouter;
