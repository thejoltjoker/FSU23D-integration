import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static("./client/dist"));

io.on("connection", (socket) => {
  let users = 0;
  let progress = 0;
  console.log("A user connected", socket.id);

  io.emit("users-online", io.sockets.server.engine.clientsCount);

  socket.on("chat-message", (msg) => {
    console.log("New message: ", msg);
    io.emit("chat-message", msg);
  });

  socket.on("video-progress", (seconds: number) => {
    io.emit("video-progress", seconds);
  });

  socket.on("user-joined", (username: string) => {
    io.emit("chat-user-joined", username);
    io.emit("users-online", io.sockets.server.engine.clientsCount);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
