import fs from "fs";

export class CartManager {
  // declaro variables privadas para el contador de id (como se guardan en memoria, no necesito revisar cual fue el ultimo) y el array en memoria.
  #carts;
  #id;
  constructor(path) {
    this.#carts = [];
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
      this.#carts = JSON.parse(data);
      //actualizamos el id al ultimo que encontremos en el que leimos, si no hay carritos, vuelve a 0
      if (this.#carts.length > 0) {
        this.#id = this.#carts[this.#carts.length - 1].id;
      } else {
        this.#id = 0;
      }
      console.log("File read successfully");
      return "File read successfully";
    }
  }

  async write() {
    const usersJson = JSON.stringify(this.#carts, null, 2);
    try {
      await fs.promises.writeFile(this.path, usersJson);
      console.log("File updated");
      return "witreFile: done";
    } catch (err) {
      console.warn(err);
      return "writeFile: error";
    }
  }

  //Agrega carrito en el array en memoria y luego guarda en archivo
  async addCart() {
    try {
      //Aumento el id en 1
      this.#id++;
      const newCart = {
        id: this.#id,
        products: [],
      };
      this.#carts.push(newCart);
      await this.write();
      return newCart.id;
    } catch (err) {
      return "addCart: error";
    }
  }

  //devuelve todos los carritos en memoria
  getCarts() {
    try {
      if (this.#carts.length === 0) {
        return "getCarts: empty";
      }
      return this.#carts;
    } catch (err) {
      return "getCarts: error";
    }
  }

  //devuelve un carrito por id, en caso de no encontrarlo devuelve error

  getCartById(id) {
    try {
      const cartById = this.#carts.find((cart) => cart.id == id);
      if (!cartById) {
        return null;
      } else {
        return cartById;
      }
    } catch (err) {
      return "getCartById: error";
    }
  }

  //Agrega un producto al array de productos de un carrito del array en memoria y luego lo guarda en el archivo
  // async addProduct(id, pid) {
  //   try {
  //     if (!pid) {
  //       return "addProduct: error, something missing";
  //     }
  //     // revisamos si el campo code no este repetido entre los elementos que ya estan cargados.
  //     const cartFound = this.#carts.find((cart) => cart.id == id);
  //     const idInCart = cartFound.products.some(product=>product.pid == pid)
  //     if(idInCart){
  //       const productFound
  //     }else{
  //       cartFound.products.push({ pid: pid, quantity: 1 });
  //     }
  //     await this.write();
  //     return cartFound;
  //   } catch (err) {
  //     return "addProduct: error";
  //   }
  // }
}
