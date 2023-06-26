import { model, Schema, Types } from "mongoose";

const collection = "carts";

const schema = new Schema({
  products: [
    {
      product_id: { type: Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true },
      _id: false,
    },
  ],
});

const Cart = model(collection, schema);

export default Cart;
