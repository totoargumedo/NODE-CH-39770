import { ProductManager } from "../constructor/ProductManagerFS.js";
// import { ProductManager } from "./constructor/ProductManagerMemory.js";

const productos = await new ProductManager("./data/data.json");
// const productos = await new ProductManager("./data/data.json");

export default productos;
