import express from "express";
import "dotenv/config.js";
import router from "./router/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import not_found_handler from "./middlewares/notFoundHandler.js";
import __dirname from "./utils.js";
import "dotenv/config.js";

export const app = express();

//options
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static routes
app.use("/", express.static("public"));

//router
app.use("/", router);

//middlewares
app.use(errorHandler);
app.use(not_found_handler);
