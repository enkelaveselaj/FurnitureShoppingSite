import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export const revalidate = 10;

export default async function ProductsPage() {
  await connectDB();

  const productsRaw = await Product.find();

  const products = JSON.parse(JSON.stringify(productsRaw));

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
                {products.length} Products Available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section">
        <div className="container-custom">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products available yet
              </h3>
              <p className="text-gray-600">
                Our collection is being curated. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}