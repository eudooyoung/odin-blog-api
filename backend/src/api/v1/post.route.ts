import {
  deletePost,
  getAllPosts,
  getPost,
  insertPost,
  updatePost,
} from "@/controllers/post.controller.js";
import { requireAdmin } from "@/middlewares/auth.middleware.js";
import { Router } from "express";

const postRouter = Router();
postRouter.get("/", getAllPosts).get("/:postId", getPost);

postRouter.use(requireAdmin);
postRouter
  .post("/", insertPost)
  .put("/:postId", updatePost)
  .delete("/:postId", deletePost);

export default postRouter;
