"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "sofa", label: "Sofas" },
  { value: "chair", label: "Chairs" },
  { value: "table", label: "Tables" },
  { value: "bed", label: "Beds" },
  { value: "storage", label: "Storage" },
  { value: "decor", label: "Decor" },
];

const priceRanges = [
  { value: "all", label: "All Prices", min: 0, max: Infinity },
  { value: "0-500", label: "Under $500", min: 0, max: 500 },
  { value: "500-1000", label: "$500 - $1000", min: 500, max: 1000 },
  { value: "1000-2000", label: "$1000 - $2000", min: 1000, max: 2000 },
  { value: "2000+", label: "Over $2000", min: 2000, max: Infinity },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory, selectedPriceRange]);

  const fetchProducts = async () => {
    try {
      console.log("Fetching products from API...");
      const response = await fetch("/api/products");
      const data = await response.json();
      console.log("API Response:", data);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    console.log("=== Filter Debug ===");
    console.log("All products:", products);
    console.log("Search term:", searchTerm);
    console.log("Selected category:", selectedCategory);
    console.log("Selected price range:", selectedPriceRange);

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("After search filter:", filtered);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => {
        const match = product.category === selectedCategory;
        console.log(`Product "${product.name}" category "${product.category}" vs "${selectedCategory}" = ${match}`);
        return match;
      });
      console.log("After category filter:", filtered);
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      const range = priceRanges.find(r => r.value === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
      console.log("After price filter:", filtered);
    }

    console.log("Final filtered products:", filtered);
    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedPriceRange("all");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white">
        <div className="container-custom min-h-[40vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white">
      {/* Hero Section */}
      <section 
        className="section relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(44, 24, 16, 0.85), rgba(139, 69, 19, 0.75)), url('https://images.unsplash.com/photo-1556025728-ef9ce8d2b3a6')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container-custom min-h-[40vh] flex items-center justify-center text-white">
          <div className="text-center space-y-6">
            <h1 className="hero-title text-white mb-6">
              Our <span className="text-[var(--accent)]">Collection</span>
            </h1>
            <p className="hero-subtitle text-gray-100 max-w-2xl mx-auto text-lg md:text-xl">
              Discover our handcrafted furniture pieces, 
              each telling a story of quality and elegance.
            </p>
            <div className="text-center">
              <span className="text-[var(--accent)] font-semibold text-lg">
                {filteredProducts.length} Products Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-1/4">
              <select
                value={selectedCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="w-full lg:w-1/4">
              <select
                value={selectedPriceRange}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        <div className="container-custom">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="text-[var(--primary)] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
