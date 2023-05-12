import { Router } from "express";
import carts from "../../controllers/cart.js";
import products from "../../controllers/products.js";

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
    next(error);
  }
};
cart_router.get("/:cid", getCartsById_function);

// Obtener carrito por id
const addCart_function = async (req, res, next) => {
  try {
    const cartCreated = await carts.addCart();
    return res.json({ success: true, response: cartCreated });
  } catch (error) {
    next(error);
  }
};
cart_router.post("/", addCart_function);

//Agregar producto al carrito, si existe se suman las unidades
const updateCart_function = async (req, res, next) => {
  try {
    //en caso de que falte algun parametro le asigno null
    let { cid, pid, units } = req.params ?? null;
    //buscamos el producto para ver el stock que queda y modificar el stock una vez que se agrega al carrito
    const productFound = await products.getProductById(pid);
    if (units > productFound.stock) {
      return res.status(200).json({
        success: false,
        response: "updateCart: error, not enough products in stock",
      });
    }
    //revisamos si existen, si lo hacen se agregan al carrito
    if (cid && pid && units) {
      const cartUpdated = await carts.updateCart(cid, pid, units);
      //si el carrito no existe se responde que no se encontro, sino se envian los datos
      if (cartUpdated) {
        await products.updateProduct(pid, {
          stock: productFound.stock - Number(units),
        });
        return res.status(200).json({ success: true, response: cartUpdated });
      } else {
        return res.status(400).json({
          success: false,
          response: "updateCart: error, cart not found",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        response: "updateCart: error, something missing",
      });
    }
  } catch (error) {
    next(error);
  }
};
cart_router.put("/:cid/product/:pid/:units", updateCart_function);

//Quitar producto al carrito, si se queda sin stock lo quita del array
const deleteProductFromCart_function = async (req, res, next) => {
  try {
    //en caso de que falte algun parametro le asigno null
    let { cid, pid, units } = req.params ?? null;
    console.log({ cid, pid, units });
    //buscamos el producto para devolverle el stock
    const productFound = await products.getProductById(pid);
    //revisamos si existen, si lo hacen se agregan al carrito
    if (cid && pid && units) {
      const cartUpdated = await carts.deleteProductFromCart(cid, pid, units);
      //si el carrito no existe se responde que no se encontro, sino se envian los datos
      if (cartUpdated) {
        await products.updateProduct(pid, {
          stock: productFound.stock + Number(units),
        });
        return res.status(200).json({ success: true, response: cartUpdated });
      } else {
        return res.status(400).json({
          success: false,
          response: "updateCart: error, cart or product not found",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        response: "updateCart: error, something missing",
      });
    }
  } catch (error) {
    next(error);
  }
};
cart_router.delete("/:cid/product/:pid/:units", deleteProductFromCart_function);

export default cart_router;
