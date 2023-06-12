import { Server } from "socket.io";
import { app } from "./app.js";
import socket_index from "./socket/index.js";
import { connect } from "mongoose";

const PORT = process.env.PORT || 8080;

//servers
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
  connect(process.env.LINK_MONGO)
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log(error));
});

const socketServer = new Server(httpServer);

socketServer.on("connection", socket_index);

export default socketServer;
