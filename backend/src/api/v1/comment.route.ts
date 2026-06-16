import {
  deleteComment,
  getAllComments,
  updateComment,
} from "@/controllers/comment.controller.js";
import { requireAdmin, requireAuth } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const commentRouter = Router();

commentRouter.get("/", requireAdmin, getAllComments);

commentRouter
  .put("/:commentId", requireAuth, updateComment)
  .delete("/:commentId", requireAuth, deleteComment);

export default commentRouter;
