import { serve } from "@hono/node-server";
import { promises as fs } from "fs";
import { Hono } from "hono";
import path from "path";

const app = new Hono();
const getMessages = async () => {
  const data = await fs.readFile(
    path.resolve(__dirname, "../messages.json"),
    "utf-8"
  );
  console.log(data);
  return JSON.parse(data);
};

app.get("/api/messages", async (c) => {
  return c.json(await getMessages(), 200);
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
