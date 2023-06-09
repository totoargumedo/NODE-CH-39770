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
    } catch (error) {
      console.error(error);
      return "addCart: error";
    }
  }

  //agrega productos al carrito
  async updateCart(cid, pid, units) {
    try {
      //revisamos que lleguen los datos necesarios
      if (cid && pid && units) {
        //buscamos el carrito
        const cartFound = this.getCartById(cid);
        //si no existe retornamos error
        if (!cartFound) {
          return null;
        }
        //revisamos si el producto ya existe en el carrito, si existe sumamos las unidades que vienen, si no existen creamos el producto en el array
        const productExist = cartFound.products.find(
          (product) => product.pid == pid
        );
        if (productExist) {
          productExist.quantity += Number(units);
        } else {
          cartFound.products.push({
            pid: Number(pid),
            quantity: Number(units),
          });
        }
        await this.write();
        return cartFound;
      } else {
        return "updateCart: error, something missing";
      }
    } catch (error) {
      console.error(error);
      return "updateCart: error";
    }
  }

  //quita productos del carrito
  async deleteProductFromCart(cid, pid, units) {
    try {
      //revisamos que lleguen los datos necesarios
      if (cid && pid && units) {
        //buscamos el carrito
        const cartFound = this.getCartById(cid);
        //si no existe retornamos error
        if (!cartFound) {
          return null;
        }
        //revisamos si el producto existe en el carrito, si existe sumamos las unidades que vienen, si no existen creamos el producto en el array
        const productExist = cartFound.products.findIndex(
          (product) => product.pid == pid
        );
        if (productExist != -1) {
          if (units >= cartFound.products[productExist].quantity) {
            cartFound.products.splice(productExist, 1);
          } else {
            cartFound.products[productExist].quantity -= Number(units);
          }
        } else {
          return "deleteProductFromCart: error, something missing";
        }
        await this.write();
        return cartFound;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return "deleteProductFromCart: error";
    }
  }

  //devuelve todos los carritos en memoria
  getCarts() {
    try {
      if (this.#carts.length === 0) {
        return "getCarts: empty";
      }
      return this.#carts;
    } catch (error) {
      console.error(error);
      return "getCarts: error";
    }
  }

  //devuelve un carrito por id, en caso de no encontrarlo devuelve error

  getCartById(id, totalItems) {
    try {
      totalItems = totalItems ?? null;
      const cartById = this.#carts.find((cart) => cart.id == id);
      if (!cartById) {
        return null;
      }
      //si viene el campo totalItems como true devuelve la cantidad de items en la propiedad productos
      if (totalItems) {
        return cartById.products.length;
      } else {
        return cartById;
      }
    } catch (error) {
      console.error(error);
      return "getCartById: error";
    }
  }
}
