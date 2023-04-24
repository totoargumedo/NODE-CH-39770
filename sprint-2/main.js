import { ProductManager } from "./constructor/ProductManagerFS.js";

async function testing() {
  const productos = await new ProductManager("./data/data.json");

  await productos.addProduct({
    title: "Pendrive Kingston 16GB",
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
  await productos.addProduct({
    title: "Pendrive Kingston 128GB",
    description: "Pendrive 128GB Kingston Rojo con tapita",
    price: 8900,
    code: "KNG128GB",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.addProduct({
    title: "Pendrive Kingston 256GB",
    description: "Pendrive 256GB Kingston Rojo con tapita",
    price: 14200,
    code: "KNG256B",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.addProduct({
    title: "Pendrive Kingston 512GB",
    description: "Pendrive 512GB Kingston Rojo con tapita",
    price: 21000,
    code: "KNG512GB",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.addProduct({
    title: "Pendrive Kingston 64GB",
    description: "Pendrive 64GB Kingston Azul con tapita",
    price: 4100,
    code: "KNG64GBA",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.addProduct({
    title: "Pendrive Kingston 128GB",
    description: "Pendrive 128GB Kingston Azul con tapita",
    price: 8900,
    code: "KNG128GBA",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.addProduct({
    title: "Pendrive Kingston 64GB",
    description: "Pendrive 64GB Kingston verde con tapita",
    price: 4100,
    code: "KNG64VGB",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.addProduct({
    title: "Pendrive Kingston 128GB",
    description: "Pendrive 128GB Kingston verde con tapita",
    price: 8900,
    code: "KNG128GBV",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.getProductById(9);
  await productos.updateProduct(9, {
    title: "Pendrive Kingston 64GB",
    description: "Pendrive 64GB Kingston violeta",
    price: 5200,
    code: "KNG64GBSTVI",
    thumbnail: "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700",
    stock: 450,
  });
  await productos.deleteProduct(10);
  await productos.getProducts();
}

testing();
