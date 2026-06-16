import { env } from "./config/env.config.js";
import { createServer } from "./server.js";

const server = createServer();

server.listen(env.port, (error) => {
  if (error) {
    console.error(error);
  }
  console.log(`App listening on port ${env.port}`);
});
