import express from "express";
import { promises as fs } from "fs";
import path from "path";

const app = express();
const port = 3000;

const getMessages = async () => {
  const data = await fs.readFile(
    path.resolve(__dirname, "../messages.json"),
    "utf-8"
  );
  console.log(data);
  return JSON.parse(data);
};

app.get("/api/messages", async (req, res) => {
  res.status(200).json(await getMessages());
});

app.use((req, res, next) => {
  res.status(404).send("You are trying to access a non-existent URL.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
