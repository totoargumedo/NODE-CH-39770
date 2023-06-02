import { Router } from "express";
import carts from "../../controllers/cart.js";
import products from "../../controllers/products.js";

const cart_router = Router();

cart_router.get("/", async (req, res, next) => {
  try {
    const oneCart = await carts.getCartById(9); //encuentro el carrito
    // let manyProducts = await products.getProducts();//me traigo los productos guardados
    let pids = oneCart.products.map((product) => product.pid); //extraigo los ids de los productos en el carrito
    let extendedCart = await oneCart.products.map((product) => {
      //quiero agregarle el nombre y la imagen al los productos que muestro por carrito para visualizar mas info
      let one = products.getProductById(product.pid);
      one.quantity = product.quantity;
      return one;
    });
    res.render("cart", { products: extendedCart });
  } catch (error) {
    next(error);
  }
});

export default cart_router;
