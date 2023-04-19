import { ProductManager } from "./constructor/ProductManagerFS.js";

const productos = new ProductManager("./files/products.json");

async function testing() {
  console.log("Manejador de productos creado");
  await console.log(productos.getProducts());
  console.log("Agregamos productos a la memoria");

  await productos.addProduct({
    titles: "Pendrive Kingston 16GB",
    description: "Pendrive 16GB Kingston Rojo con tapita",
    price: 1890,
    code: "KNG16GB",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.addProduct({
    title: "Pendrive Kingston 32GB",
    description: "Pendrive 32GB Kingston Rojo con tapita",
    price: 2550,
    code: "KNG32GB",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.addProduct({
    title: "Pendrive Kingston 64GB",
    description: "Pendrive 64GB Kingston Rojo con tapita",
    price: 4100,
    code: "KNG64GB",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
}
console.log("Productos en memoria");
const productsInMemory = await productos.getProducts();
console.table(productsInMemory);

testing();
// //Se agrega con propiedades erroneas a proposito
// productos.addProduct({
//   title: "Pendrive Kingston 128GB",
//   description: "Pendrive 128GB Kingston Rojo con tapita",
//   price: 7500,
//   code: "KNG128GB",
//   thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
//   stock: 450,
// });
// productos.addProduct({
//   title: "Pendrive Kingston 32GB",
//   description: "Pendrive 32GB Kingston Rojo con tapita",
//   price: 2550,
//   code: "KNG32GB",
//   thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
//   stock: 450,
// });
// console.log("Buscamos producto con ID 2 y  4");
// const productById1 = productos.getProductById(2);
// const productById2 = productos.getProductById(4);
// console.log(productById1);
// console.log(productById2);
