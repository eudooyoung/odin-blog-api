import {
  verifyCommentOwner,
  verifyCommentOwnerOrAdmin,
} from "@/middlewares/auth.middleware.js";
import {
  createCommentByPostAndUserId,
  deleteCommentById,
  findAllComments,
  findCommentsByPostId,
  updateCommentById,
} from "@/repositories/comment.repository.js";
import type { CommentBody, CreateCommentInput } from "@/types/comment.types.js";
import { validateCommentHandler } from "@/validates/comment.validate.js";
import type { RequestHandler } from "express";
import { matchedData } from "express-validator";

const createCommentHandler: RequestHandler = async (req, res) => {
  const { content }: CommentBody = matchedData(req);
  const commentInput: CreateCommentInput = {
    content,
    postId: Number(req.params.postId),
    authorId: req.user!.id,
  };
  const commentId = await createCommentByPostAndUserId(commentInput);
  res.status(201).json({ commentId });
};

export const createComment = [...validateCommentHandler, createCommentHandler];

export const getAllComments: RequestHandler = async (req, res) => {
  const comments = await findAllComments();
  res.json(comments);
};

export const getCommentsByPostId: RequestHandler = async (req, res) => {
  const comments = await findCommentsByPostId(Number(req.params.postId));
  res.json(comments);
};

const updateCommentHandler: RequestHandler = async (req, res) => {
  const { content }: CommentBody = matchedData(req);
  await updateCommentById(Number(req.params.commentId), content);
  res.sendStatus(204);
};

export const updateComment = [
  ...validateCommentHandler,
  verifyCommentOwner,
  updateCommentHandler,
];

const deleteCommentHandler: RequestHandler = async (req, res) => {
  await deleteCommentById(Number(req.params.commentId));
  res.sendStatus(204);
};

export const deleteComment = [verifyCommentOwnerOrAdmin, deleteCommentHandler];
