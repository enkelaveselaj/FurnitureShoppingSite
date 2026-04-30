import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";

export const revalidate = 10;

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findOne({ _id: id });

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/products"
            className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const p = JSON.parse(JSON.stringify(product));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--light)] to-white">
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[var(--primary)] transition-colors">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{p.name}</span>
        </nav>
      </div>

      {/* Product Details */}
      <div className="container-custom pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-[var(--light)] to-gray-100">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className="w-32 h-32 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-[var(--accent)] transition-all duration-200">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.name} view ${i}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            {p.category && (
              <div>
                <span className="bg-[var(--primary)] text-white text-sm px-3 py-1 rounded-full">
                  {p.category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {p.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-[var(--primary)]">
                ${p.price}
              </span>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {p.description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[var(--primary)] hover:bg-[var(--secondary)] text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Add to Cart
                </button>
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-lg transition-all duration-200">
                  Save for Later
                </button>
              </div>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Free delivery</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>In stock</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="border-t pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600">Fast Delivery</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600">Secure Payment</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-600">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}