import express from "express";
import bodyParser from "body-parser";
import dotenv1 from "dotenv";
import cors from "cors";
import authRouter from "./Router/Auths.js";

import postRouter from "./Router/Posts.js";
import { fileURLToPath } from "url";

import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const dotenv = dotenv1.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.get("/", (req, res) => {
  res.json("hey");
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`The server is listening on port ${port}`);
});
