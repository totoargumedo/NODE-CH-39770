import { Router } from "express";
import carts from "../../controllers/cart.js";
import products from "../../controllers/products.js";

const cart_router = Router();

cart_router.get("/", async (req, res, next) => {
  try {
    const oneCart = await carts.getCartById(9); //encuentro el carrito
    // let manyProducts = await products.getProducts();//me traigo los productos guardados
    let extendedCart = await oneCart.products.map((product) => {
      //quiero que la vista de carrito pueda mostrar mas datos como el nombre y la imagen
      let one = { ...products.getProductById(product.pid) };
      //agrego la cantidad a este nuevo array de productos
      one.quantity = product.quantity;
      //limito la cantidad de productos que pueden agregar en la vista
      one.max = one.quantity + one.stock;
      return one;
    });
    res.render("cart", { products: extendedCart });
  } catch (error) {
    next(error);
  }
});

export default cart_router;
