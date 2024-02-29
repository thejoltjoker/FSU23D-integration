import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to my first Express.js server!");
});

app.get("/products", (req, res) => {
  res.status(200).send("Here are all products.");
});

app.get("/orders", (req, res) => {
  res.status(200).send("Here are all orders.");
});

app.use((req, res, next) => {
  res.status(404).send("You are trying to access a non-existent URL.");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
