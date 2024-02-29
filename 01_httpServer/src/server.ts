import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end("Welcome to my first Node.js server!");
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
