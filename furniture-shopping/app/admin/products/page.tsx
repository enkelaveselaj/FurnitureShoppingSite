"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminProducts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication and admin role
    if (status === "loading") return;
    
    if (!session) {
      router.push("/login");
      return;
    }
    
    if (session.user?.role !== "admin") {
      router.push("/");
      return;
    }
    
    fetchProducts();
  }, [session, status, router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await fetch(`/api/products/${id}`, {
          method: "DELETE",
        });
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[var(--accent)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Product Management
          </h1>
          <p className="text-gray-600">
            Manage your furniture inventory and product catalog
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-gray-600">
              {products.length} products in inventory
            </div>
            <div className="flex gap-3">
              <Link href="/admin/products/create">
                <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-5 py-2.5 rounded-md transition-colors duration-200">
                  Add New Product
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-gray-900 mb-2">
              No products yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by adding your first product to inventory
            </p>
            <Link href="/admin/products/create">
              <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200">
                Create Your First Product
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                isAdmin={true}
                onEdit={(id) => router.push(`/admin/products/edit/${id}`)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}