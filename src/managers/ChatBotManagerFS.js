import fs from "fs";
import products from "../controllers/products.js";

export class ChatBot {
  #messages;
  //manager para extraer o interactuar con opciones de mensajeria
  constructor(path) {
    this.#messages = [];
    this.path = path; //ruta al archivo que se creara
    this.init(path);
  }

  //inicializar el archivo de datos, en caso de no existir lo crea, caso contrario lo lee y lo carga al array

  init(path) {
    const fileExists = fs.existsSync(path);
    if (!fileExists) {
      fs.writeFileSync(path, "[]");
      console.log(`File created ${path}`);
      return `File created ${path}`;
    } else {
      const data = fs.readFileSync(path, "utf-8");
      this.#messages = JSON.parse(data);
      console.log("File read successfully");
      return "File read successfully";
    }
  }

  //devuelve todos los mensajes en memoria
  getMessages() {
    try {
      if (this.#messages.length === 0) {
        return "getMessages: empty";
      }
      return this.#messages;
    } catch (error) {
      console.error(error);
      return "getMessages: error";
    }
  }

  //devuelve un producto por id, en caso de no encontrarlo devuelve error
  getMessageById(id) {
    try {
      const messageById = this.#messages.find((message) => message.id == id);
      if (!messageById) {
        return null;
      } else {
        return messageById;
      }
    } catch (error) {
      console.error(error);
      return "getMessageById: error";
    }
  }
}
