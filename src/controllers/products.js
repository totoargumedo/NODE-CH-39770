import { ProductManager } from "../managers/ProductManagerFS.js";
// import { ProductManager } from "./constructor/ProductManagerMemory.js";

const products = await new ProductManager("./src/data/data.json");
// const products = await new ProductManager("./data/data.json");

export default products;
