import { Router } from "express";
import Cart from "../../models/Cart.js";
import Product from "../../models/Product.js";
import { Types } from "mongoose";

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
    //Intente popular y luego ordenar el array interno de productos, pero trabajar con arrays resulto una tarea mas compleja de lo que pense y termine haciendo un agregation gigante pero salio
    // const cartFound = await Cart.findById(req.params.cid)
    //   .populate("products.product_id")
    //   .sort({ "Cart.products.product_id.title": "asc" });
    const cartFound = await Cart.aggregate([
      { $match: { _id: new Types.ObjectId(req.params.cid) } },
      { $unwind: { path: "$products" } },
      {
        $lookup: {
          from: "products",
          localField: "products.product_id",
          foreignField: "_id",
          let: {
            quantity: "$products.quantity",
          },
          pipeline: [
            {
              $project: {
                _id: "$_id",
                title: "$title",
                description: "$description",
                price: "$price",
                thumbnail: "$thumbnail",
                stock: "$stock",
                quantity: "$$quantity",
              },
            },
          ],
          as: "products",
        },
      },
      { $unwind: { path: "$products" } },
      { $sort: { "products.title": 1 } },
      { $group: { _id: "$_id", products: { $push: "$products" } } },
    ]);
    if (!cartFound) {
      return res.json({
        success: false,
        response: "Not Found",
      });
    } else {
      return res.json({ success: true, response: cartFound[0] });
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
    let units = req.params.units ?? null;
    //revisamos si existen, si lo hacen se agregan al carrito
    if (req.params.cid && req.params.pid && units) {
      //buscamos el producto para ver el stock que queda y agregar al carrito los que quedan o los que se req.params.pide segun corresponda
      const productFound = await Product.findById(req.params.pid);
      if (units > productFound.stock) {
        return res.status(200).json({
          success: false,
          response: "Not enough products in stock",
        });
      }
      const productExists = await Cart.findOne({
        _id: req.params.cid,
        products: { $elemMatch: { product_id: req.params.pid } },
      });
      if (!productExists) {
        const one = await Cart.findOneAndUpdate(
          { _id: req.params.cid },
          {
            $addToSet: {
              products: { product_id: productFound._id, quantity: units },
            },
          },
          { new: true }
        );
        //si el carrito no existe se responde que no se encontro, sino se envian los datos
        if (one) {
          await Product.findByIdAndUpdate(req.params.pid, {
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
          { _id: req.params.cid, "products.product_id": req.params.pid },
          { $set: { "products.$.quantity": units } },
          { new: true }
        );
        if (one) {
          await Product.findByIdAndUpdate(req.params.pid, {
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

//Quitar producto al carrito, si se queda sin unidades lo quita del array
const deleteProductFromCart_function = async (req, res, next) => {
  try {
    //en caso de que falte algun parametro le asigno null
    let units = req.params.units ?? null;
    //buscamos el producto para devolverle el stock
    const productFound = await Product.findById(req.params.pid);
    //revisamos si existen, si lo hacen se quitan del carrito
    if (req.params.cid && req.params.pid && units) {
      const cartUpdated = await Cart.findOneAndUpdate(
        {
          _id: req.params.cid,
        },
        { $pull: { products: { product_id: req.params.pid } } }
      );
      //si el carrito no existe se responde que no se encontro, sino se envian los datos
      if (cartUpdated) {
        await Product.findByIdAndUpdate(req.params.pid, {
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

//obtener total del carrito
const getBillTotal_function = async (req, res, next) => {
  try {
    let bill = await Cart.aggregate([
      { $match: { _id: new Types.ObjectId(req.params.cid) } },
      { $unwind: { path: "$products" } },
      {
        $lookup: {
          from: "products",
          localField: "products.product_id",
          foreignField: "_id",
          let: {
            quantity: "$products.quantity",
          },
          pipeline: [
            {
              $project: {
                _id: 0,
                total: { $multiply: ["$$quantity", "$price"] },
              },
            },
          ],
          as: "products",
        },
      },
      { $unwind: { path: "$products" } },
      { $group: { _id: "$_id", total: { $sum: "$products.total" } } },
    ]);
    if (bill) {
      return res.status(200).json({ success: true, response: bill[0] });
    } else {
      return res.status(400).json({
        success: false,
        response: "Not foundd",
      });
    }
  } catch (error) {
    next(error);
  }
};
cart_router.get("/bills/:cid", getBillTotal_function);

export default cart_router;
