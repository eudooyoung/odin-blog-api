import {
  getUser,
  getUsers,
  insertUser,
} from "@/controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", getUsers).post("/", insertUser).get("/:userId", getUser);

export default userRouter;
