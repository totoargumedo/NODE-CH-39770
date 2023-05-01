import { randomUUID } from "crypto";
import fs from "fs";

export class ProductManager {
  // declaro variables privadas para el contador de id (como se guardan en memoria, no necesito revisar cual fue el ultimo) y el array en memoria.
  #products;
  #id;
  constructor(path) {
    this.#products = [];
    this.path = path; //ruta al archivo que se creara
    this.init(path);
  }

  //inicializar el archivo de datos, en caso de no existir lo crea, caso contrario lo lee y lo carga al array

  init(path) {
    const fileExists = fs.existsSync(path);
    if (!fileExists) {
      fs.writeFileSync(path, "[]");
      //en caso de que el archivo no exista, id = 0
      this.#id = 0;
      console.log(`File created ${path}`);
      return `File created ${path}`;
    } else {
      const data = fs.readFileSync(path, "utf-8");
      this.#products = JSON.parse(data);
      //actualizamos el id al ultimo que encontremos en el que leimos, si no hay productos, vuelve a 0
      if (this.#products.length > 0) {
        this.#id = this.#products[this.#products.length - 1].id;
      } else {
        this.#id = 0;
      }
      console.log("File read successfully");
      return "File read successfully";
    }
  }

  async write() {
    const usersJson = JSON.stringify(this.#products, null, 2);
    try {
      await fs.promises.writeFile(this.path, usersJson);
      console.log("File updated");
      return "witreFile: done";
    } catch (err) {
      console.warn(err);
      return "writeFile: error";
    }
  }

  //Agrega producto en el array en memoria y luego guarda en archivo
  async addProduct({ title, description, price, code, thumbnail, stock }) {
    try {
      if (!title || !description || !price || !code || !thumbnail || !stock) {
        return console.log("addProduct: error");
      }
      // revisamos si el campo code no este repetido entre los elementos que ya estan cargados.
      if (this.#products.some((item) => item.code == code)) {
        return console.log(`addProduct: error, ${code} already exists`);
      }
      //Campos por defecto
      thumbnail =
        thumbnail ?? "https://i.insider.com/602ee9ced3ad27001837f2ac?width=700"; //Agrego un valor por defecto para thumbnail en caso de que se envie campo vacio
      stock = stock ?? 0; //Si el campo stock no viene o viene vacio se convierte en 0
      //Aumento el id en 1
      this.#id++;
      const newProduct = {
        id: this.#id,
        title,
        description,
        price,
        code,
        thumbnail,
        stock,
      };
      this.#products.push(newProduct);
      console.log(
        `Producto ${newProduct.title} con id:${newProduct.id} agregado correctamente`
      );
      await this.write();
      return newProduct.id;
    } catch (err) {
      console.warn(err);
      return "addProduct: error";
    }
  }

  //devuelve todos los productos en memoria
  getProducts() {
    try {
      if (this.#products.length === 0) {
        console.log("Not found");
        return this.#products;
      }
      return this.#products;
    } catch (err) {
      console.warn(err);
      return "getProducts: error";
    }
  }

  //devuelve un producto por id, en caso de no encontrarlo devuelve error

  getProductById(id) {
    try {
      const productById = this.#products.find((product) => product.id == id);
      if (!productById) {
        return null;
      } else {
        return productById;
      }
    } catch (err) {
      console.warn(err);
      return "getProductById: error";
    }
  }

  //Actualiza un del array en memoria y luego lo guarda en el archivo
  async updateProduct(id, data) {
    try {
      //busco producto reutilizando metodo
      const productFound = this.getProductById(id); // tambien puedo utilizar un filter sobre this-#products
      //En caso de no encontrar el producto
      if (!productFound) {
        return "Not found";
      }
      //verifico si recibo valores para actualizar
      if (Object.keys(data) === 0) {
        return "updateProduct: error, no values to update";
      }
      //sobreescribo los valores de las propiedades
      for (let prop in data) {
        //reviso si los valores enviados correspondes a las propiedades existentes
        if (
          prop !== "title" &&
          prop !== "description" &&
          prop !== "price" &&
          prop !== "code" &&
          prop !== "thumbnail" &&
          prop !== "stock"
        ) {
          console.log(
            `updateProduct: error, ${prop} is not a correct property`
          );
          return `updateProduct: error, ${prop} is not a correct property`;
        }
        productFound[prop] = data[prop];
      }
      await this.write();
      return "updateProduct: done";
    } catch (err) {
      console.warn(err);
      return "updateProduct: error";
    }
  }

  //Borra producto de array en memoria y luego guarda cambios en el archivo
  async deleteProduct(id) {
    //busco producto por index
    try {
      const index = this.#products.findIndex((product) => product.id === id);
      if (index === -1) {
        return "Not found";
      }
      this.#products = this.#products.filter((product) => product.id != id);
      await this.write();
      return "deleteProduct: done";
    } catch (err) {
      console.warn(err);
      return "deleteProduct: error";
    }
  }
}
