import { Router } from "express";
import userRouter from "./user.route.js";

const v1 = Router();

v1.use("/users", userRouter);

export default v1;
