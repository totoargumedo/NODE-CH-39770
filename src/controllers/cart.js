import { CartManager } from "../managers/CartManagerFS.js";

const carts = await new CartManager("./src/data/carts.json");

export default carts;
