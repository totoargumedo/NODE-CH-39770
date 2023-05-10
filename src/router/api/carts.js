import { Router } from "express";
import carts from "../../controllers/cart.js";

const cart_router = Router();

//endpoints

// Obtener carritos
const getCarts_function = async (req, res, next) => {
  try {
    const cartsFound = await carts.getCarts();
    return res.json({ success: true, response: cartsFound });
  } catch (error) {
    next(error);
  }
};
cart_router.get("/", getCarts_function);
// Obtener carrito por id
const getCartsById_function = async (req, res, next) => {
  try {
    const cartFound = await carts.getCartById(req.params.cid);
    if (cartFound === null) {
      return res.json({
        success: false,
        response: {},
      });
    }
    return res.json({ success: true, response: cartFound });
  } catch (error) {
    error(next);
  }
};
cart_router.get("/:cid", getCartsById_function);

export default cart_router;
