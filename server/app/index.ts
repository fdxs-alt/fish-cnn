/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Response, Request, NextFunction } from "express";
import multer from "multer";
import { join } from "path";
import { logger } from "./logger";
import { labels, loadModel, predictResult } from "./model";
import "./env";
import { getEnvVar } from "./utils";
import { AppError } from "./error";

async function main() {
  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  const model = await loadModel();
  const app = express();

  app.use(express.json());

  app.set("views", join(__dirname, "../views"));
  app.set("view engine", "ejs");

  app.use(express.static(join(__dirname, "public")));

  app.get("/", (_req, res) => {
    res.render("main", { labels });
  });

  app.post("/file", upload.single("file"), async (req, res, next) => {
    if (!req.file) {
      return next(new AppError("Bad request no file", 400));
    }

    const result = await predictResult(model, req.file.buffer);

    res.json({ result });
  });

  app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    const status = err instanceof AppError ? err.status : 500;

    logger.info(
      `Error with status ${status} and message: ${err.message} occured!`
    );

    res.status(status).json({ message: err.message });
  });

  const PORT = getEnvVar("PORT");

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

main();
