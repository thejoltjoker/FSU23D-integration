import express from "express";
import {
  authorize,
  login,
  logout,
  register,
} from "../controllers/auth.controller";
export const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authorize", authorize);

export default router;
