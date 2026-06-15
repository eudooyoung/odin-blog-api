import { getAllUsers, insertUser } from "@/controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/", insertUser).get("/", getAllUsers);

export default userRouter;
