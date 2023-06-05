import express from "express";
import router from "./router/index.js";
import handlebars from "express-handlebars";
import errorHandler from "./middlewares/errorHandler.js";
import not_found_handler from "./middlewares/notFoundHandler.js";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import socket_index from "./socket/index.js";

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

export const socketServer = new Server(httpServer);

//static routes
app.use("/public", express.static("public"));

//router
app.use("/", router);

//middlewares
app.use(errorHandler);
app.use(not_found_handler);

//socket
socketServer.on("connection", socket_index);
