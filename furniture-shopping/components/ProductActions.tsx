"use client";

import { useState } from "react";
import Button from "./Button";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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
  const [successMessage, setSuccessMessage] = useState("");
  const cart = useCart();
  const router = useRouter();
  const { data: session } = useSession();
  
  if (!cart) {
    return null; // or handle loading state
  }
  
  const { addItem } = cart;

  const handleAddToCart = async () => {
    try {
      setError("");
      setShowAuthAlert(false);
      setSuccessMessage("");
      
      await addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
      
      // Reset quantity after adding
      setQuantity(1);
      
      // Show success message
      setSuccessMessage("Added to cart!");
    } catch (error: any) {
      console.error("Failed to add item to cart:", error);
      
      // Handle authentication errors specifically
      if (error.isAuthError) {
        setShowAuthAlert(true);
        setError("");
        setSuccessMessage("");
      } else {
        setError(error.message || "Failed to add item to cart");
      }
    }
  };

  const handleAddToFavorites = async () => {
    try {
      setError("");
      setShowAuthAlert(false);
      setSuccessMessage("");
      
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add to favorites");
      }

      // Show success message
      setSuccessMessage("Added to favorites!");
    } catch (error: any) {
      console.error("Failed to add to favorites:", error);
      
      // Handle authentication errors specifically
      if (error.isAuthError) {
        setShowAuthAlert(true);
        setError("");
        setSuccessMessage("");
      } else {
        setError(error.message || "Failed to add to favorites");
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

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414 1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-800">{successMessage}</p>
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
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414 1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" clipRule="evenodd" />
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

      {/* Add to Favorites Button */}
      <Button
        onClick={handleAddToFavorites}
        className="w-full"
        size="lg"
      >
        Add to Favorites
      </Button>

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
