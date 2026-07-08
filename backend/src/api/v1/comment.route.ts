import {
  deleteComment,
  updateComment,
} from "@/controllers/comment.controller.js";
import { requireCommentOwner } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const commentRouter = Router();

commentRouter
  .put("/:commentId", requireCommentOwner, updateComment)
  .delete("/:commentId", requireCommentOwner, deleteComment);

export default commentRouter;
