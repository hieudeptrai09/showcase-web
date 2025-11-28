import Link from "next/link";
import { Product } from "@/lib/data";
import { Star, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                Hết hàng
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 mb-2">{product.manufacturer}</p>

          <div className="flex items-center mb-2">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating}
              </span>
            </div>
            {product.reviews.length > 0 && (
              <span className="text-sm text-gray-400 ml-2">
                ({product.reviews.length} đánh giá)
              </span>
            )}
          </div>

          <div className="mt-auto">
            <p className="text-2xl font-bold text-primary mb-2">
              {formatPrice(product.price)}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Package size={16} className="text-gray-400 mr-1" />
                <span
                  className={
                    product.inStock ? "text-green-600" : "text-red-600"
                  }
                >
                  {product.inStock
                    ? `Còn ${product.stock} sản phẩm`
                    : "Hết hàng"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
