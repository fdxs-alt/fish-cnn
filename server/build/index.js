"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./env");
const logger_1 = require("./logger");
const path_1 = require("path");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.set("views", (0, path_1.join)(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(express_1.default.static((0, path_1.join)(__dirname, "public")));
app.get("/", (_req, res) => {
    res.render("main");
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger_1.logger.info(`Server running on port ${PORT}`);
});
