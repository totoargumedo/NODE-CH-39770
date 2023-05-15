import express from "express";
import router from "./router/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import not_found_handler from "./middlewares/notFoundHandler.js";

const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

//static routes
app.use("/public", express.static("public"));

//router
app.use("/", router);

//middlewares
app.use(errorHandler);
app.use(not_found_handler);
