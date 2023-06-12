import { Router } from "express";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

const cart_router = Router();

cart_router.get("/", async (req, res, next) => {
  try {
    const one = await Cart.findById("64874ecf7ac94944740664a1")
      .populate("products.product_id")
      .lean(); //encuentro el carrito
    let extendedOne = one.products.map((product) => {
      product.max = product.product_id.stock + product.quantity;
      return product;
    });
    res.render("cartDB", { products: extendedOne });
  } catch (error) {
    next(error);
  }
});

export default cart_router;
