import express from "express";
import { chatWithAI, getAIConversation } from "../controllers/ai.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/chat", protectRoute, chatWithAI);
router.get("/conversation", protectRoute, getAIConversation);

export default router;
