import express from "express";
import cors from "cors";
import errorHandler from "./errors/errorHandler.js";
import v1 from "@/api/v1/routes.js";

export const createServer = () => {
  const app = express();

  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors());

  app.use(v1);

  app.use(errorHandler);

  return app;
};
