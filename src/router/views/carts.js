import { Router } from "express";
import carts from "../../controllers/cart.js";

const cart_router = Router();

cart_router.get("/carts", async (req, res, next) => {
  try {
    const one = await carts.getCartById(1);
    res.render("cart", { products: one.products });
  } catch (error) {
    next(error);
  }
});

export default cart_router;
