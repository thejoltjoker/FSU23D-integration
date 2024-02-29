import http from "http";

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my first Node.js server!");
  } else if (req.url === "/products") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Here are all products.");
  } else if (req.url === "/orders") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Here are all orders.");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("You are trying to access a non-existent URL.");
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
