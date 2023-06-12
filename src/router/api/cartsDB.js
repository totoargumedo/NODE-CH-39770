import { Router } from "express";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";

const cart_router = Router();

//endpoints

// Obtener carritos
const getCarts_function = async (req, res, next) => {
  try {
    const cartsFound = await Cart.find().populate("products.product_id");
    if (cartsFound) {
      return res.status(200).json({ success: true, response: cartsFound });
    } else {
      return res.status(404).json({ success: false, response: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};
cart_router.get("/", getCarts_function);
// Obtener carrito por id
const getCartsById_function = async (req, res, next) => {
  try {
    const cartFound = await Cart.findById(req.params.cid);
    if (!cartFound) {
      return res.json({
        success: false,
        response: "Not Found",
      });
    } else {
      return res.json({ success: true, response: cartFound });
    }
  } catch (error) {
    next(error);
  }
};
cart_router.get("/:cid", getCartsById_function);

// Obtener carrito por id
const addCart_function = async (req, res, next) => {
  try {
    const cartCreated = await Cart.create({});
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
    //revisamos si existen, si lo hacen se agregan al carrito
    if (cid && pid && units) {
      //buscamos el producto para ver el stock que queda y agregar al carrito los que quedan o los que se pide segun corresponda
      const productFound = await Product.findById(pid);
      if (units > productFound.stock) {
        return res.status(200).json({
          success: false,
          response: "Not enough products in stock",
        });
      }
      const productExists = await Cart.findOne({
        _id: cid,
        products: { $elemMatch: { product_id: pid } },
      });
      if (!productExists) {
        const one = await Cart.findOneAndUpdate(
          { _id: cid },
          {
            $addToSet: {
              products: { product_id: productFound._id, quantity: units },
            },
          },
          { new: true }
        );
        //si el carrito no existe se responde que no se encontro, sino se envian los datos
        if (one) {
          await Product.findByIdAndUpdate(pid, {
            stock: productFound.stock - Number(units),
          });
          return res.status(200).json({ success: true, response: one });
        } else {
          return res.status(404).json({
            success: false,
            response: "Cart Not found",
          });
        }
      } else {
        const one = await Cart.findOneAndUpdate(
          { _id: cid, "products.product_id": pid },
          { $set: { "products.$.quantity": units } },
          { new: true }
        );
        if (one) {
          await Product.findByIdAndUpdate(pid, {
            stock: productFound.stock - Number(units),
          });
          return res.status(200).json({ success: true, response: one });
        } else {
          return res.status(404).json({
            success: false,
            response: "Cart Not found",
          });
        }
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
    //buscamos el producto para devolverle el stock
    const productFound = await Product.findById(pid).lean();
    //revisamos si existen, si lo hacen se agregan al carrito
    if (cid && pid && units) {
      const cartUpdated = await Cart.findOneAndUpdate(
        {
          _id: cid,
          products: { $elemMatch: { product_id: pid } },
        },
        { $unset: { products: "" } }
      );
      //si el carrito no existe se responde que no se encontro, sino se envian los datos
      if (cartUpdated) {
        await Product.findByIdAndUpdate(pid, {
          stock: productFound.stock + Number(units),
        });
        return res
          .status(200)
          .json({ success: true, response: cartUpdated._id });
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
