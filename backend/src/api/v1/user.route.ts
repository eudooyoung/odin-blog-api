import {
  deleteUser,
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
} from "@/controllers/user.controller.js";
import {
  requireAdmin,
  requireSelfOrAdmin,
} from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const userRouter = Router();
userRouter.post("/", insertUser);

userRouter
  .get("/", requireAdmin, getAllUsers)
  .get("/:userId", requireSelfOrAdmin, getUser)
  .put("/:userId", requireSelfOrAdmin, updateUser)
  .delete("/:userId", requireSelfOrAdmin, deleteUser);

export default userRouter;
