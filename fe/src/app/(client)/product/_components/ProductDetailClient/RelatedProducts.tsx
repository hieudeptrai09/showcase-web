import Link from "next/link";
import { Star } from "lucide-react";
import { ApiProduct } from "@/lib/api";
import { formatPrice, calculateAvgRating } from "../../_utils/fns";

interface RelatedProductsProps {
  relatedProducts: ApiProduct[];
}

export default function RelatedProducts({
  relatedProducts,
}: RelatedProductsProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((relatedProduct) => (
          <Link
            key={relatedProduct.id}
            href={`/product/${relatedProduct.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gray-100 relative">
              {relatedProduct.isHighlighted && (
                <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-white px-2 py-1 rounded-full font-semibold text-xs flex items-center gap-1 shadow-md">
                  <Star size={14} className="fill-white" />
                  Nổi bật
                </div>
              )}
              <img
                src={
                  relatedProduct.images[0] || "https://via.placeholder.com/400"
                }
                alt={relatedProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {relatedProduct.name}
              </h3>
              <div className="flex items-center mb-2">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">
                  {calculateAvgRating(relatedProduct.ratings)}
                </span>
              </div>
              <p className="text-xl font-bold text-primary">
                {formatPrice(relatedProduct.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
