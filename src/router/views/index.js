import { Router } from "express";
import product_router from "./products.js";
import cart_router from "./carts.js";
import chatbot_router from "./chatbot.js";

const view_router = Router();

//welcome
view_router.get("/", (req, res) => {
  res.render("index");
});

view_router.use("/", product_router);
view_router.use("/carts", cart_router);
view_router.use("/chat", chatbot_router);

export default view_router;
