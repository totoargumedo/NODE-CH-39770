import { CartManager } from "../dao/CartManagerFS.js";

const carts = await new CartManager("./src/data/carts.json");

export default carts;
