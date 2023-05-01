import { CartManager } from "../constructor/CartManagerFS.js";

const carritos = await new CartManager("./data/carts.json");

// carritos.addCart();
// carritos.addCart();
// carritos.addCart();
export default carritos;
