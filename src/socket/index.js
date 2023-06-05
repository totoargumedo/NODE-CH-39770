import carts from "../controllers/cart.js";
import bot from "../controllers/bot.js";
import products from "../controllers/products.js";
import { socketServer } from "../app.js";

function socket_index(socket) {
  console.log("New socket client");

  socket.on("cart-addProduct", () => {
    const productsInCart = carts.getCartById(9, true); //forzamos que el carrito que muestre sea el 1, el segundo argumento indica que solo queremos el total de productos
    socket.emit("cart-productsTotal", productsInCart);
  });

  socketServer.emit("cart-productsTotal", carts.getCartById(9, true));

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
