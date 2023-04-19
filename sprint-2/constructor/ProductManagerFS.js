import { randomUUID } from "crypto";
import fs from "fs";

export class ProductManager {
  // declaro variables privadas para el contador de id (como se guardan en memoria, no necesito revisar cual fue el ultimo) y el array en memoria.
  #products;
  #id;
  constructor(path) {
    this.#products = [];
    this.#id = 0;
    this.path = path; //ruta al archivo que se creara
    this.init(path);
  }

  //inicializar el archivo de datos, en caso de no existir lo crea, caso contrario lo lee y lo carga al array

  async init(path) {
    const fileExists = fs.existsSync(path);
    if (!fileExists) {
      await fs.promises
        .writeFile(path, "[]")
        .then((res) => console.log("File created"))
        .catch((err) => console.warn(err));
    } else {
      await fs.promises
        .readFile(path, "utf-8")
        .then((res) => {
          console.log("File read successfully");
          const dataParsed = JSON.parse(res);
          return dataParsed;
        })
        .then((res) => {
          this.#products = res;
        })
        .catch((err) => console.warn(err));
    }
  }

  async write() {
    const usersToSave = JSON.stringify(this.#products, null, 2);
    await fs.promises
      .writeFile(this.path, usersToSave)
      .then((res) => console.log("File updated"))
      .catch((err) => console.warn(err));
  }

  //Agrega producto al array en memoria, si falta algun campo devuelve un error por consola (solucion temporal) y no ingresa el producto

  async addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.code ||
      !product.thumbnail
    ) {
      return console.log("addProduct: error");
    }
    // revisamos si el campo code no este repetido entre los elementos que ya estan cargados.
    if (this.#products.some((item) => item.code == product.code)) {
      return console.log(`The code ${product.code} already exists`);
    }
    product.thumbnail =
      product.thumbnail ??
      "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700"; //Agrego un valor por defecto para thumbnail en caso de que se envie campo vacio
    product.stock = product.stock ?? 0; //Si el campo stock no viene o viene vacio se convierte en 0
    this.#id++;
    //const id = randomUUID(); //Para generar IDs aleatorios en lugar de consecutivos en memoria
    const newProduct = { id: this.#id, ...product };
    this.#products.push(newProduct);
    console.log(
      `Producto ${newProduct.title} con id:${newProduct.id} agregado correctamente`
    );
    await this.write();
    return newProduct.id;
  }

  //devuelve todos los productos en memoria
  getProducts() {
    if (this.#products.length === 0) {
      console.log("Not found");
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
