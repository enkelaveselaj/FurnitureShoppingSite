"use client";

import { useState } from "react";
import Button from "./Button";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

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
  const [error, setError] = useState("");
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const cart = useCart();
  const router = useRouter();
  
  if (!cart) {
    return null; // or handle loading state
  }
  
  const { addItem } = cart;

  const handleAddToCart = async () => {
    try {
      setError("");
      setShowAuthAlert(false);
      
      await addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
      
      // Reset quantity after adding
      setQuantity(1);
    } catch (error: any) {
      console.error("Failed to add item to cart:", error);
      
      // Handle authentication errors specifically
      if (error.isAuthError) {
        setShowAuthAlert(true);
        setError("");
      } else {
        setError(error.message || "Failed to add item to cart");
      }
    }
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className="space-y-4">
      {/* Authentication Alert */}
      {showAuthAlert && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Authentication Required
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>You need to be logged in to add items to your cart.</p>
                <div className="mt-3 flex space-x-2">
                  <button
                    onClick={handleLoginRedirect}
                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-1 px-3 rounded text-sm transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowAuthAlert(false)}
                    className="text-yellow-700 hover:text-yellow-800 font-medium py-1 px-3 rounded text-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
              <button
                onClick={() => setError("")}
                className="mt-2 text-red-700 hover:text-red-800 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

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
