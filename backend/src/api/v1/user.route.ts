import {
  deleteUser,
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
} from "@/controllers/user.controller.js";
import {
  requireAdmin,
  requireOwnerOrAdmin,
} from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const userRouter = Router();
userRouter.post("/", insertUser);

userRouter
  .get("/", requireAdmin, getAllUsers)
  .get("/:userId", requireOwnerOrAdmin, getUser)
  .put("/:userId", requireOwnerOrAdmin, updateUser)
  .delete("/:userId", requireOwnerOrAdmin, deleteUser);

export default userRouter;
