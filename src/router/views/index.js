import { Router } from "express";
import product_router from "./products.js";
import cart_routerFS from "./cartsFS.js";
import cart_routerDB from "./cartsDB.js";
import chatbot_router from "./chatbot.js";

const view_router = Router();

//welcome
view_router.get("/", (req, res) => {
  res.render("index");
});

view_router.use("/", product_router);
view_router.use("/cartsFS", cart_routerFS);
view_router.use("/cartsDB", cart_routerDB);
view_router.use("/chat", chatbot_router);

export default view_router;
