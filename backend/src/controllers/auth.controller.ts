import { issueJWT } from "@/lib/issueJWT.js";
import type { RequestHandler } from "express";

export const loginHandler: RequestHandler = (req, res) => {
  const { token, expires } = issueJWT(req.user!);
  res.json({ user: req.user!, token, expires });
};
