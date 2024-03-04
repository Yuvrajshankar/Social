import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { allPosts, likePost, ownPosts, userPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", verifyToken, allPosts);
router.get("/posts", verifyToken, ownPosts)
router.get("/:userId", verifyToken, userPosts);
router.patch("/posts/:postId/like", verifyToken, likePost);

export default router;