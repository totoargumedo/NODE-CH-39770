import { Server } from "socket.io";
import { app } from "./app.js";
import socket_index from "./socket/index.js";

const PORT = 8080;

//servers
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", socket_index);

export default socketServer;
