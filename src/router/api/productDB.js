import { Router } from "express";
import Product from "../../models/Product.js";

const product_router = Router();

//endpoints

// Obtener productos

const getProducts_function = async (req, res, next) => {
  try {
    const limit = req.query.limit ?? null;
    if (req.query.limit <= 0) {
      return res.status(400).json({
        success: false,
        response: "Invalid Limit",
      });
    }
    const productsFound = await Product.find({}, null, {
      limit: req.query.limit,
    });
    if (productsFound) {
      res.status(200).json({
        success: true,
        response: productsFound,
      });
    } else {
      res.status(404).json({
        success: false,
        response: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
};
product_router.get("/", getProducts_function);

// Obtener productos por id
const getProductsById_function = async (req, res, next) => {
  try {
    const productFound = await Product.find({ _id: req.params.pid });
    if (!productFound) {
      return res.status(400).json({
        success: false,
        response: {},
      });
    }
    return res.status(200).json({ success: true, response: productFound });
  } catch (error) {
    next(error);
  }
};
product_router.get("/:pid", getProductsById_function);

//Crear producto
const addProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).redirect("/productsDB");
  } catch (error) {
    next(error);
  }
};

product_router.post("/", addProduct);

//Actualizar producto
const updateProduct = async (req, res, next) => {
  try {
    const pid = req.params.pid ?? null;
    const data = req.body ?? null;

    if (data && pid) {
      const one = await Product.findOneAndUpdate(pid, data, { new: true });
      if (one) {
        return res
          .status(200)
          .json({ success: true, response: updatedProduct });
      } else {
        return res.status(404).json({ success: false, response: "Not found" });
      }
    } else {
      return res.status(400).json({
        success: false,
        response: "updateProduct: error, something missing",
      });
    }
  } catch (error) {
    next(error);
  }
};

product_router.put("/:pid", updateProduct);

//Borrar producto
//Actualizar producto
const deleteProduct = async (req, res, next) => {
  try {
    let pid = req.params.pid ?? null;

    if (pid) {
      const deleteProduct = await Product.findOneAndDelete(pid);
      if (deleteProduct) {
        return res.status(200).json({ success: true, response: deleteProduct });
      } else {
        return res.status(404).json({ success: true, response: "Not found" });
      }
    } else {
      return res.status(400).json({
        success: false,
        response: "deleteProduct: error, something missing",
      });
    }
  } catch (error) {
    next(error);
  }
};

product_router.delete("/:pid", deleteProduct);

export default product_router;
