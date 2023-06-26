import { Router } from "express";
import product_routerFS from "./productFS.js";
import product_routerDB from "./productDB.js";
import cart_routerFS from "./cartsFS.js";
import cart_routerDB from "./cartsDB.js";

const api_router = Router();

api_router.use("/productsFS", product_routerFS);
api_router.use("/productsDB", product_routerDB);
api_router.use("/cartsFS", cart_routerFS);
api_router.use("/cartsDB", cart_routerDB);

export default api_router;
