import Link from "next/link";
import Button from "./Button";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card group">
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-[var(--light)] to-gray-100 rounded-t-xl overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-3 right-3">
            <span className="bg-[var(--primary)] text-white text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
        )}

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Link
            href={`/products/${product._id}`}
            className="bg-white text-[var(--dark)] font-semibold px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[var(--primary)]">
            ${product.price}
          </span>
        </div>

        {/* Action Button */}
        <Link href={`/products/${product._id}`} className="block">
          <Button variant="primary" fullWidth>
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
