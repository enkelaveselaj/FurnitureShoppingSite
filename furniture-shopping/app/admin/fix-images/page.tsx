"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function FixImagesPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const fixImages = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/admin/fix-images", {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fix images");
      }

      setResult(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session || session.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">Admin access required</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Fix Product Images
            </h1>
            
            <p className="text-gray-600 mb-8">
              This tool will replace all placeholder image URLs with actual uploaded images.
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            {result && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-green-800 font-semibold mb-2">Success!</h3>
                <p className="text-green-700 mb-2">
                  Updated {result.updatedCount} products with placeholder images.
                </p>
                {result.updatedProducts.length > 0 && (
                  <details className="mt-3">
                    <summary className="text-green-600 cursor-pointer font-medium">
                      View updated products
                    </summary>
                    <div className="mt-2 space-y-2">
                      {result.updatedProducts.map((product: any, index: number) => (
                        <div key={index} className="text-sm text-green-600">
                          <strong>{product.name}</strong>
                          <br />
                          <span className="text-xs">From: {product.oldImage}</span>
                          <br />
                          <span className="text-xs">To: {product.newImage}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}

            <button
              onClick={fixImages}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Fixing images...
                </div>
              ) : (
                "Fix Product Images"
              )}
            </button>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-yellow-800 font-semibold mb-2">⚠️ Important</h3>
              <p className="text-yellow-700 text-sm">
                This will replace all placeholder images with the same uploaded image. 
                Make sure you have proper product images uploaded before running this.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
