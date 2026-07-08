import {
  createPostByUserId,
  deletePostById,
  findAllPosts,
  findAllPublishedPosts,
  findPostById,
  updatePostById,
} from "@/repositories/post.repository.js";
import type { PostBody, CreatePostInput } from "@/types/post.types.js";
import type { RequestHandler } from "express";

export const getAllPublishedPosts: RequestHandler = async (req, res) => {
  const posts = await findAllPublishedPosts();
  res.json(posts);
};

export const getAllPosts: RequestHandler = async (req, res) => {
  const posts = await findAllPosts();
  res.json(posts);
};

export const insertPost: RequestHandler = async (req, res) => {
  const { title, content, published } = req.body as PostBody;
  const input: CreatePostInput = {
    title,
    content,
    published,
    authorId: Number(req.user!.id),
  };
  const postId = await createPostByUserId(input);
  res.status(201).json({ postId });
};

export const getPost: RequestHandler = async (req, res) => {
  const postId = Number(req.params.postId);
  const post = await findPostById(postId);
  res.json(post);
};

export const updatePost: RequestHandler = async (req, res) => {
  const { title, content, published } = req.body as PostBody;
  const input = {
    id: Number(req.params.postId),
    title,
    content,
    published,
  };
  const postId = await updatePostById(input);
  res.json({ postId });
};

export const deletePost: RequestHandler = async (req, res) => {
  await deletePostById(Number(req.params.postId));
  res.sendStatus(204);
};
