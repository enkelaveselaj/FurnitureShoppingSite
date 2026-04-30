import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

export default mongoose.models.CartItem ||
  mongoose.model("CartItem", CartItemSchema);