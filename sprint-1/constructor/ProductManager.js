import { randomUUID } from "crypto";

export class ProductManager {
  // declaro variables privadas para el contador de id (como se guardan en memoria, no necesito revisar cual fue el ultimo) y el array en memoria.
  #products;
  #id;
  constructor() {
    this.#products = [];
    this.#id = 0;
  }

  //Agrega producto al array en memoria, si falta algun campo devuelve un error por consola (solucion temporal) y no ingresa el producto

  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.thumbnail ||
      !product.stock
    ) {
      return console.log("Info in product missing");
    }
    // revisamos si el campo code no este repetido entre los elementos que ya estan cargados.
    if (this.#products.some((item) => item.code == product.code)) {
      return console.log(`The code ${product.code} already exists`);
    }
    product.thumbnail =
      product.thumbnail ??
      "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700"; //Agrego un valor por defecto para thumbnail en caso de que se envie campo vacio
    this.#id++;
    //const id = randomUUID(); //Para generar IDs aleatorios en lugar de consecutivos en memoria
    const newProduct = { id: this.#id, ...product };
    this.#products.push(newProduct);
    console.log(
      `Producto ${newProduct.title} con id:${newProduct.id} agregado correctamente`
    );
    return newProduct;
  }

  //devuelve todos los productos en memoria
  getProducts() {
    if (this.#products.length === 0) {
      console.log("No existen elementos en memoria");
      return this.#products;
    }
    return this.#products;
  }

  //devuelve un producto por id, en caso de no encontrarlo devuelve error

  getProductById(id) {
    const productById = this.#products.find((product) => product.id == id);
    if (!productById) {
      console.log(`Product id:${id} Not Found`);
    } else {
      return productById;
    }
  }
}
