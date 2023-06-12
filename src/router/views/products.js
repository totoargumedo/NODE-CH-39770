import { Router } from "express";
import products from "../../controllers/products.js";
import Product from "../../models/Product.js";

const product_router = new Router();

product_router.get("/new_product", (req, res) => {
  res.render("new_product");
});

product_router.get("/productsFS", async (req, res, next) => {
  try {
    const many = await products.getProducts();
    res.render("products", { products: many });
  } catch (error) {
    next(error);
  }
});

product_router.get("/productsDB", async (req, res, next) => {
  try {
    const many = await Product.find().lean();
    console.log(many[0]._id);
    res.render("products", { products: many });
  } catch (error) {
    next(error);
  }
});

product_router.get("/productsDB/:pid", async (req, res, next) => {
  try {
    const one = await Product.findById(req.params.pid).lean();
    if (one.stock === 0) {
      return res.render("product", { product: one, units: false });
    }
    return res.render("product", { product: one, units: true });
  } catch (error) {
    next(error);
  }
});

export default product_router;
