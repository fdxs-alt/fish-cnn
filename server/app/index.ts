import express from "express";
import multer from "multer";
import { setTimeout } from "timers/promises";
import { join } from "path";
import { logger } from "./logger";
import { labels, loadModel, predictResult } from "./model";
import "./env";

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

  app.post("/file", upload.single("file"), async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "Bad request no file" });
    }

    const result = await predictResult(model, req.file.buffer);

    await setTimeout(2000);
    res.json({ result });
  });

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}
main();
