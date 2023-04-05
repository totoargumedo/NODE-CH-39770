import { ProductManager } from "./constructor/ProductManager.js";

const productos = new ProductManager();

console.log("Manejador de productos creado");
console.log(productos.getProducts());
console.log("Agregamos productos a la memoria");

//Se agrega con propiedades erroneas a proposito
productos.addProduct({
  titles: "Pendrive Kingston 16GB",
  description: "Pendrive 16GB Kingston Rojo con tapita",
  price: 1890,
  thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
  stock: 450,
});
productos.addProduct({
  title: "Pendrive Kingston 32GB",
  description: "Pendrive 32GB Kingston Rojo con tapita",
  price: 2550,
  thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
  stock: 450,
});
productos.addProduct({
  title: "Pendrive Kingston 64GB",
  description: "Pendrive 64GB Kingston Rojo con tapita",
  price: 4100,
  thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
  stock: 450,
});
productos.addProduct({
  title: "Pendrive Kingston 128GB",
  description: "Pendrive 128GB Kingston Rojo con tapita",
  price: 7500,
  thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
  stock: 450,
});
console.log("Productos en memoria");
const productsInMemory = productos.getProducts();
console.table(productsInMemory);
console.log("Buscamos producto con ID 2 y  4");
const productById1 = productos.getProductById(2);
const productById2 = productos.getProductById(4);
console.log(productById1);
console.log(productById2);
