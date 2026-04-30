"use client";

import { useState } from "react";
import Button from "./Button";
import { useCart } from "@/contexts/CartContext";

interface ProductActionsProps {
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const cart = useCart();
  
  if (!cart) {
    return null; // or handle loading state
  }
  
  const { addItem } = cart;

  const handleAddToCart = async () => {
    try {
      await addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
      
      // Reset quantity after adding
      setQuantity(1);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <label className="font-semibold text-gray-700">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-r border-gray-300"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border-0 focus:outline-none"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 border-l border-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        className="w-full"
        size="lg"
      >
        Add to Cart
      </Button>
    </div>
  );
}
