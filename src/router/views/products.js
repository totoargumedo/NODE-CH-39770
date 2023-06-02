import { Router } from "express";
import products from "../../controllers/products.js";

const product_router = new Router();

product_router.get("/new_product", (req, res) => {
  res.render("new_product");
});

product_router.get("/", async (req, res, next) => {
  try {
    const many = await products.getProducts();
    res.render("products", { products: many });
  } catch (error) {
    next(error);
  }
});

product_router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const one = await products.getProductById(id);
    if (one.stock == 0) {
      return res.render("product", { product: one, units: false });
    }
    return res.render("product", { product: one, units: true });
  } catch (error) {
    next(error);
  }
});

export default product_router;
