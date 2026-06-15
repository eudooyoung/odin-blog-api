import ForbiddenError from "@/errors/forbiddenError.js";
import RecordNotFoundError from "@/errors/recordNotFoundError.js";
import {
  createCommentByPostAndUserId,
  findAllComments,
  findCommentById,
  findCommentsByPostId,
  updateCommentById,
} from "@/repositories/comment.repository.js";
import type { CommentBody, CreateCommentInput } from "@/types/comment.types.js";
import { validateComment } from "@/validates/comment.validate.js";
import type { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";

const createCommentHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array(), prev: req.body as CommentBody });
  }
  const { content }: CommentBody = matchedData(req);
  const commentInput: CreateCommentInput = {
    content,
    postId: Number(req.params.postId),
    authorId: req.user!.id,
  };
  const commentId = await createCommentByPostAndUserId(commentInput);
  res.status(201).json({ commentId });
};

export const createComment = [...validateComment, createCommentHandler];

export const getAllComments: RequestHandler = async (req, res) => {
  const comments = await findAllComments();
  res.json(comments);
};

export const getCommentsByPostId: RequestHandler = async (req, res) => {
  const comments = await findCommentsByPostId(Number(req.params.postId));
  res.json(comments);
};

const updateCommentHandler: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ errors: errors.array(), prev: req.body as CommentBody });
  }

  const comment = await findCommentById(Number(req.params.commentId));
  if (!comment) {
    throw new RecordNotFoundError({
      message: "Record not exists",
      statusCode: 404,
    });
  }

  if (comment.authorId !== req.user!.id) {
    throw new ForbiddenError({
      message: "Permission denied",
      statusCode: 403,
    });
  }

  const { content }: CommentBody = matchedData(req);
  await updateCommentById(Number(req.params.commentId), content);
  res.sendStatus(204);
};

export const updateComment = [...validateComment, updateCommentHandler];
