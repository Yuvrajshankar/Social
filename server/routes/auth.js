import express from "express";
import { alreadyLoggedIn, login, logout } from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/already", verifyToken, alreadyLoggedIn);

export default router;