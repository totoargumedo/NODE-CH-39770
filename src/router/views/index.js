import { Router } from "express";
import product_router from "./products.js";
import cart_router from "./carts.js";

const view_router = Router();

//welcome
view_router.get("/", (req, res) => {
  res.render("index");
});

view_router.use("/products", product_router);
view_router.use("/carts", cart_router);

export default view_router;
