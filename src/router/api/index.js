import { Router } from "express";
import product_router from "./product.js";
import cart_router from "./carts.js";

const api_router = Router();

api_router.use("/products", product_router);
api_router.use("/carts", cart_router);

export default api_router;
