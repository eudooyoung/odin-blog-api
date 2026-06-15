import { Router } from "express";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";
import postRouter from "./post.route.js";

const v1 = Router();

v1.use("/users", userRouter).use("/auth", authRouter).use("/posts", postRouter);

export default v1;
