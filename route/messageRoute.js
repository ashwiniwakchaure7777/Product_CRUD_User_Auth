import express from "express";
import { getMessages, sendMessage } from "../controller/messageController.js"; // Controller for message APIs
const router = express.Router();

router.get("/getMsg", getMessages);
router.post("/sendmsg", sendMessage);

export default router;
