import { Router } from "express";
import products from "../../controllers/products.js";

const product_router = Router();

//endpoints

// Obtener productos

const getProducts_function = async (req, res, next) => {
  try {
    const productsFound = await products.getProducts();
    if (req.query.limit) {
      return res.status(200).json({
        success: true,
        response: productsFound.slice(0, req.query.limit),
      });
    }
    if (req.query.limit <= 0) {
      return res.status(400).json({
        success: false,
        response: "Invalid Limit",
      });
    }
    return res.status(200).json({ success: true, response: productsFound });
  } catch (error) {
    next(error);
  }
};
product_router.get("/", getProducts_function);

// Obtener productos por id
const getProductsById_function = async (req, res, next) => {
  try {
    const productFound = await products.getProductById(req.params.pid);
    if (productFound === null) {
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
    let { title, description, price, code, thumbnail, stock } =
      req.body ?? null;
    // let title = req.body.title ?? null;
    // let description = req.body.description ?? null;
    // let price = req.body.price ?? null;
    // let code = req.body.code ?? null;
    // let thumbnail = req.body.thumbnail ?? null;
    // let stock = req.body.stock ?? null;

    if (title && description && price && code && thumbnail && stock) {
      const newProduct = await products.addProduct({
        title,
        description,
        price,
        code,
        thumbnail,
        stock,
      });
      return res.status(201).json({ success: true, response: newProduct });
    } else {
      return res.status(400).json({
        success: false,
        response: "addProduct: error, something missing1",
      });
    }
  } catch (error) {
    next(error);
  }
};

product_router.post("/", addProduct);

//Actualizar producto
const updateProduct = async (req, res, next) => {
  try {
    let pid = req.params.pid ?? null;
    let data = req.body ?? null;

    if (data && pid) {
      const updatedProduct = await products.updateProduct(pid, data);
      return res.status(200).json({ success: true, response: updatedProduct });
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
      const deleteProduct = await products.deleteProduct(pid);
      return res.status(200).json({ success: true, response: deleteProduct });
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
