import * as env from "dotenv";
import { logger } from "./logger";
import { join } from "path";

const result = env.config({ path: join(__dirname, "../.env") });

if (result.error) {
  logger.error("Cannot load .env file");
}
