import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";

import authRouter from "./routers/auth.router";
import catRouter from "./routers/cat.router";

const port = 3000;
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
  cookieSession({
    secret: "cookie-monster",
    maxAge: 1000 * 60 * 60,
  })
);

app.use("/cat", catRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
