import express from "express";
import path from "path";
const app = express();
const port = 3000;

let visitorCount = 0;

app.get("/", (req, res) => {
  visitorCount = visitorCount + 1;
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.get("/api/visitors", (req, res) => {
  res.json({ visitors: visitorCount });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
