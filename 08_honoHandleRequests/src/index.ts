import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Welcome to my first Hono server!");
});

app.get("/products", (c) => {
  return c.text("Here are all products.", 200);
});

app.get("/orders", (c) => {
  return c.text("Here are all orders.", 200);
});

app.notFound((c) => {
  return c.text("You are trying to access a non-existent URL.", 404);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
