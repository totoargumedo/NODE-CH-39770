import express from "express";
import productos from "./controllers/products.js";
import carritos from "./controllers/cart.js";

const app = express();

const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

//endpoints

// Obtener productos
const getProducts_function = async (req, res) => {
  try {
    const productsFound = await productos.getProducts();
    if (req.query.limit) {
      return res.json({
        success: true,
        response: productsFound.slice(0, req.query.limit),
      });
    }
    if (req.query.limit <= 0) {
      return res.json({
        success: false,
        response: "Invalid Limit",
      });
    }
    return res.json({ success: true, response: productsFound });
  } catch (error) {
    return res.json({
      success: false,
      response: error,
    });
  }
};
app.get("/products", getProducts_function);

// Obtener productos por id
const getProductsById_function = async (req, res) => {
  try {
    const productFound = await productos.getProductById(req.params.pid);
    if (productFound === null) {
      return res.json({
        success: false,
        response: {},
      });
    }
    return res.json({ success: true, response: productFound });
  } catch (error) {
    return res.json({
      success: false,
      response: error,
    });
  }
};
app.get("/products/:pid", getProductsById_function);

// Obtener carritos
const getCarts_function = async (req, res) => {
  try {
    const cartsFound = await carritos.getCarts();
    return res.json({ success: true, response: cartsFound });
  } catch (error) {
    return res.json({
      success: false,
      response: error,
    });
  }
};
app.get("/carts", getCarts_function);

// Obtener carrito por id
const getCartsById_function = async (req, res) => {
  try {
    const cartFound = await carritos.getCartById(req.params.cid);
    if (cartFound === null) {
      return res.json({
        success: false,
        response: {},
      });
    }
    return res.json({ success: true, response: cartFound });
  } catch (error) {
    return res.json({
      success: false,
      response: error,
    });
  }
};
app.get("/carts/:cid", getCartsById_function);
