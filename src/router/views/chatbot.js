import { Router } from "express";

const chatbot_router = Router();

//welcome
chatbot_router.get("/", (req, res) => {
  res.render("chatbot");
});

export default chatbot_router;
