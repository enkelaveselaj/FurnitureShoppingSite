"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";

interface FavoriteProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
  createdAt: string;
  description: string;
  category?: string;
}

interface FavoriteResponse {
  _id: string;
  user: string;
  product: FavoriteProduct;
  createdAt: string;
}

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
      return;
    }

    fetchFavorites();
  }, [session, status]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/favorites");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch favorites");
      }

      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: string) => {
    try {
      setError("");
      
      const response = await fetch(`/api/favorites`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: favoriteId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to remove from favorites");
      }

      // Remove from local state
      setFavorites(prev => prev.filter(fav => fav._id !== favoriteId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setError(error instanceof Error ? error.message : "Failed to remove from favorites");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 bg-[var(--accent)] rounded-full animate-spin"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Loading your favorites...</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => setError("")}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white py-8">
      <div className="container-custom max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          <p className="text-gray-600">Products you've saved for later</p>
        </div>

        {/* Favorites Grid */}
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a1 1 0 00-1.657-1.657l-1.657-1.657h1.314a1 1 0 001.657-1.657l1.657 1.657H9a1 1 0 00-1.657-1.657L20.84 4.61a1 1 0 00-1.657-1.657l-1.657 1.657z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600">Start adding products to your favorites to see them here!</p>
            <Link 
              href="/products"
              className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 inline-block"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite._id} className="relative">
                <ProductCard product={favorite.product} />
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Added on {new Date(favorite.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleRemoveFavorite(favorite._id)}
                    className="text-red-600 hover:text-red-700 font-medium text-sm"
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
