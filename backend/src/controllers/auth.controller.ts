import { issueJwt } from "@/lib/issueJwt.js";
import type { RequestHandler } from "express";

export const loginHandler: RequestHandler = (req, res) => {
  const { token, expires } = issueJwt(req.user!);
  res.json({ user: req.user!, token, expires });
};
