import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import simpleGit from "simple-git";
import { generateId } from "./utils";
import { getAllFilePaths } from "./file";
import path from "path";
import { uploadFile } from "./aws";
import { createClient } from "redis";
const app = express();
const port = 8080;
const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();
// Middleware
app.use(cors());
app.use(express.json());
// Basic route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl; // github link
  const _id = generateId();
  await simpleGit().clone(repoUrl, path.join(__dirname, `./output/${_id}`));
  const allFiles = getAllFilePaths(path.join(__dirname, `./output/${_id}`));
  console.log(allFiles);
  allFiles.forEach(async (file) => {
    await uploadFile(file.slice(__dirname.length + 1), file);
  });

  await new Promise((resolve) => setTimeout(resolve, 5000));
  publisher.lPush("build-queue", _id);
  // INSERT => SQL
  // .create =>
  publisher.hSet("status", _id, "uploaded");

  res.json({
    id: _id,
  });
});

app.get("/status", async (req, res) => {
  const id = req.query.id;
  const response = await subscriber.hGet("status", id as string);
  res.json({
    status: response,
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
