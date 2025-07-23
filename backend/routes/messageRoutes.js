import express from "express";
import { getAllMessages, deleteMessage,getMessageById,createMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getAllMessages);
router.get("/:id", getMessageById);
router.delete("/:id", deleteMessage);
router.post("/", createMessage);

export default router;
