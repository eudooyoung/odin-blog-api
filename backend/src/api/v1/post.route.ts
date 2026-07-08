import {
  createComment,
  getCommentsByPostId,
} from "@/controllers/comment.controller.js";
import {
  getAllPublishedPosts,
  getPost,
} from "@/controllers/post.controller.js";
import { requireAuth } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const postRouter = Router();
postRouter
  .get("/", getAllPublishedPosts)
  .get("/:postId", getPost)
  .get("/:postId/comments", getCommentsByPostId)
  .post("/:postId/comments", requireAuth, createComment);

export default postRouter;
