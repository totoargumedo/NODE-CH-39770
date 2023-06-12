import { model, Schema } from "mongoose";

const collection = "products";

const schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, index: true },
  code: { type: String, required: true, unique: true },
  thumbnail: { type: String, required: true },
  stock: { type: Number, index: true, default: 0 },
});

const Product = model(collection, schema);

export default Product;
