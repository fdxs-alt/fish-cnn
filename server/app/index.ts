import express from "express";
import multer from "multer";
import { join } from "path";
import { logger } from "./logger";
import "./env";

async function main() {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });

  const app = express();

  app.use(express.json());

  app.set("views", join(__dirname, "../views"));
  app.set("view engine", "ejs");

  app.use(express.static(join(__dirname, "public")));

  app.get("/", (_req, res) => {
    res.render("main");
  });

  app.post("/file", upload.single("file"), (req, res) => {
    if (!req.file) {
      res.status(400).json({ error: "Bad request no file" });
    }

    res.json({ hello: "hi" });
  });

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}
main();
