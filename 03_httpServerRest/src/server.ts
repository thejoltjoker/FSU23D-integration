import { promises as fs } from "fs";
import http from "http";
import path from "path";

const getMessages = async () => {
  const data = await fs.readFile(
    path.resolve(__dirname, "../messages.json"),
    "utf-8"
  );
  console.log(data);
  return JSON.parse(data);
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/api/messages") {
    res.writeHead(200, { "Content-Type": "application/json" });
    getMessages()
      .then((response) => {
        res.end(JSON.stringify(response));
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("You are trying to access a non-existent URL.");
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
