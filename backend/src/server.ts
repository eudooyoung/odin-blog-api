import express from "express";
import cors from "cors";
import errorHandler from "./errors/errorHandler.js";
import v1 from "@/api/v1/route.js";

export const createServer = () => {
  const app = express();

  app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cors());

  app.use("/api/v1", v1);

  app.use(errorHandler);

  return app;
};
