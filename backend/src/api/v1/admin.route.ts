import {
  deletePost,
  getAllPosts,
  insertPost,
  updatePost,
} from "@/controllers/post.controller.js";
import { requireAdmin, verifyAdmin } from "@/middlewares/auth.middleware.js";
import { Router, type RequestHandler } from "express";
import passport from "@/config/passport.config.js";
import { loginHandler } from "@/controllers/auth.controller.js";
import {
  deleteComment,
  updateComment,
} from "@/controllers/comment.controller.js";

const adminRouter = Router();

adminRouter.post(
  "/auth/login",
  passport.authenticate("local", { session: false }) as RequestHandler,
  verifyAdmin,
  loginHandler,
);

adminRouter
  .use(requireAdmin)

  .get("/posts", getAllPosts)
  .put("/posts/:postId", updatePost)
  .delete("/posts/:postId", deletePost)

  .put("/comments/:commentId", updateComment)
  .delete("/comments/:commentId", deleteComment);

export default adminRouter;
