import express from "express";
import router from "./router/index.js";
import handlebars from "express-handlebars";
import errorHandler from "./middlewares/errorHandler.js";
import not_found_handler from "./middlewares/notFoundHandler.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import carts from "./controllers/cart.js";

const app = express();

const PORT = 8080;

//options
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//servers
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

const socketServer = new Server(httpServer);

//static routes
app.use("/public", express.static("public"));

//router
app.use("/", router);

//middlewares
app.use(errorHandler);
app.use(not_found_handler);

//socket
socketServer.on("connection", (socket) => {
  console.log("New socket client");

  socket.on("cart-addProduct", () => {
    const productsInCart = carts.getCartById(9, true); //forzamos que el carrito que muestre sea el 1, el segundo argumento indica que solo queremos el total de productos
    socket.emit("cart-productsTotal", productsInCart);
  });

  socketServer.emit("cart-productsTotal", carts.getCartById(9, true));
});
