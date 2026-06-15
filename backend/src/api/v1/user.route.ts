import { getUsers, insertUser } from "@/controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.post("/", insertUser);

export default userRouter;
