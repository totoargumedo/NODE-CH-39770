import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import bot from "../controllers/bot.js";
import socketServer from "../server.js";

//funcion asincrona para traer items en carrito
async function getCartTotalProducts() {
  const one = await Cart.findById("64874ecf7ac94944740664a1");
  return one.products.length;
}

async function sendCartTotal() {
  const cartTotal = await getCartTotalProducts();
  socketServer.emit("cart-productsTotal", cartTotal);
}

//buscar productos por nombre en chatbot
async function getProductByName(data) {
  let search_keys = data.toLowerCase().replace("/buscar", "").split(" ");
  search_keys.splice(0, 1);
  let title = new RegExp(search_keys, "i");
  let search = await Product.find({ title: title });
  if (search.length <= 0) {
    return null;
  } else {
    return search;
  }
}

function socket_index(socket) {
  console.log("New socket client");

  sendCartTotal();

  socket.on("added-product", async () => {
    const cartTotal = await getCartTotalProducts();
    socket.emit("cart-productsTotal", cartTotal);
  });

  socket.on("bot-new-connection", () => {
    const welcome_message = bot.getMessageById(0);
    socket.emit("bot-welcome", welcome_message);
  });

  socket.on("new-message", async (data) => {
    let messages = await bot.getMessages();
    let option_exists = false;

    //si se recibe una busquerda
    if (data.includes("/buscar")) {
      let search = await getProductByName(data);
      if (!search) {
        return socket.emit("message-response", {
          message: "No se encontraron productos con el nombre proporcionado",
        });
      } else {
        return socket.emit("message-response", {
          message:
            "Se encontraron los siguientes productos con los datos proporcionados",
          products: search,
        });
      }
    }

    //si se recibe una opcion buscamos con cual concuerda
    messages.forEach((message) => {
      if (data.includes(message.id)) {
        option_exists = message;
      }
    });

    //devolvemos respuesta de acuerdo a la opcion elegida
    if (option_exists) {
      return socket.emit("message-response", option_exists);
    } else {
      return socket.emit("message-response", {
        message:
          "Mis respuestas son limitadas. Debes elegir entre las opciones disponibles.",
      });
    }
  });
}

export default socket_index;
