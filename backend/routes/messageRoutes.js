import express from "express";
import { verifyFirebaseToken } from "../middleware/authMiddleware.js";
import { getAllMessages, getMessageById, deleteMessage, createMessage, updateFollowUp } from "../controllers/messageController.js"

const router = express.Router();

router.get("/", verifyFirebaseToken, getAllMessages);
router.get("/:id", verifyFirebaseToken, getMessageById);
router.delete("/:id", verifyFirebaseToken, deleteMessage);
router.post("/", verifyFirebaseToken, createMessage);
router.post("/followup/:id", verifyFirebaseToken, updateFollowUp);


export default router;
 