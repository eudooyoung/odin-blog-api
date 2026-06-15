import {
  createComment,
  getCommentsByPostId,
} from "@/controllers/comment.controller.js";
import {
  deletePost,
  getAllPosts,
  getPost,
  insertPost,
  updatePost,
} from "@/controllers/post.controller.js";
import { requireAdmin, requireAuth } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const postRouter = Router();
postRouter.get("/", getAllPosts);
postRouter.get("/:postId", getPost);

postRouter
  .post("/", requireAdmin, insertPost)
  .put("/:postId", requireAdmin, updatePost)
  .delete("/:postId", requireAdmin, deletePost);

postRouter
  .post("/:postId/comments", requireAuth, createComment)
  .get("/:postId/comments", getCommentsByPostId);

export default postRouter;
