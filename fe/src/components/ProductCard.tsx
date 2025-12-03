import Link from "next/link";
import { Star, Package } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  producer: string;
  noInStock: number;
  image: string;
  isHighlighted: boolean;
  rating: number;
  reviewCount: number;
}

export default function ProductCard({
  id,
  name,
  price,
  producer,
  noInStock,
  image,
  isHighlighted,
  rating,
  reviewCount,
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <Link href={`/product/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 bg-gray-100">
          <img src={image} alt={name} className="w-full h-full object-cover" />
          {isHighlighted && (
            <div className="absolute top-2 right-2 z-2">
              <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <Star size={14} className="fill-white" />
                Nổi bật
              </span>
            </div>
          )}
          {noInStock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
                Hết hàng
              </span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
            {name}
          </h3>

          <p className="text-sm text-gray-500 mb-2">{producer}</p>

          {reviewCount > 0 && (
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm text-gray-600 ml-1">{rating}</span>
              </div>
              <span className="text-sm text-gray-400 ml-2">
                ({reviewCount} đánh giá)
              </span>
            </div>
          )}

          <div className="mt-auto">
            <p className="text-2xl font-bold text-primary mb-2">
              {formatPrice(price)}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Package size={16} className="text-gray-400 mr-1" />
                <span
                  className={noInStock > 0 ? "text-green-600" : "text-red-600"}
                >
                  {noInStock > 0 ? `Còn ${noInStock} sản phẩm` : "Hết hàng"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
