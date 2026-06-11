import dotenv from "dotenv";

dotenv.config();

const dbEnv = process.env.DB_ENV || "development";
dotenv.config({
  path: [`.env.${dbEnv}`],
  override: true,
});

const config = {
  port: Number(process.env.PORT),
  sessionSecret: process.env.SESSION_SECRET,
  dbUrl: process.env.DATABASE_URL,
};

export default config;
