import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { addRemoveFriend, getAllFriends, getOtherProfile, getProfile } from "../controllers/user.js";

const router = express.Router();

router.get("/", verifyToken, getProfile);
router.get("/all", verifyToken, getAllFriends);
router.get("/:userId", verifyToken, getOtherProfile);
router.patch("/:friendId", verifyToken, addRemoveFriend);

export default router;