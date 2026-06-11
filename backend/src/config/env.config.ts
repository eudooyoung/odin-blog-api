import { config } from "dotenv";

config();

const dbEnv = process.env.DB_ENV || "development";
config({
  path: [`.env.${dbEnv}`],
  override: true,
});

const env = {
  port: Number(process.env.PORT),
  sessionSecret: process.env.SESSION_SECRET,
  dbUrl: process.env.DATABASE_URL,
  debug: process.env.APP_DEBUG === "true",
};

export { env };
