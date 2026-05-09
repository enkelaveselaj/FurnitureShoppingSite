import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: {
    type: String,
    enum: ['sofa', 'chair', 'table', 'bed', 'storage', 'decor'],
    default: 'decor'
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);