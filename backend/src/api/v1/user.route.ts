import {
  deleteUser,
  getUser,
  insertUser,
  updateUser,
} from "@/controllers/user.controller.js";
import { requireAccountOwner } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const userRouter = Router();
userRouter.post("/", insertUser);

userRouter
  .use(requireAccountOwner)
  .get("/:userId", getUser)
  .put("/:userId", updateUser)
  .delete("/:userId", deleteUser);

export default userRouter;
