import express from "express";
import { get as getCat } from "../controllers/cat.controller";
import { loggedIn } from "../middleware/loggedIn";
export const router = express.Router();

router.get("/", loggedIn, getCat);

export default router;
