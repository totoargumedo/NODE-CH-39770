import { ProductManager } from "../dao/ProductManagerFS.js";
// import { ProductManager } from "./constructor/ProductManagerMemory.js";

const products = await new ProductManager("./src/data/products.json");
// const products = await new ProductManager("./data/products.json");

export default products;
