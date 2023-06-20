import Cart from "../models/Cart.js";
import bot from "../controllers/bot.js";
import socketServer from "../server.js";

//funcion asincrona para traer items en carrito
async function getCartTotalProducts() {
  const one = await Cart.findById("64874ecf7ac94944740664a1");
  await socketServer.emit("cart-productsTotal", one.products.length);
}

function socket_index(socket) {
  console.log("New socket client");

  getCartTotalProducts();

  socket.on("bot-new-connection", () => {
    const welcome_message = bot.getMessageById(0);
    socket.emit("bot-welcome", welcome_message);
  });

  socket.on("new-message", async (data) => {
    let messages = await bot.getMessages();
    let option_exists = false;

    //si se recibe una busquerda
    if (data.includes("/buscar")) {
      let search = await products.getProductByName(data);
      return socket.emit("message-response", {
        message:
          "Se encontraron los siguientes productos con los datos proporcionados",
        products: search,
      });
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
