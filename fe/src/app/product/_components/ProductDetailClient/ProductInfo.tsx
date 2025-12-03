"use client";

import { Star, Package, Phone, Facebook } from "lucide-react";
import { ApiProduct } from "@/lib/api";
import { shopInfo } from "@/lib/shopInfo";
import { formatPrice, calculateAvgRating } from "../../_utils/fns";

interface ProductInfoProps {
  product: ApiProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>

      <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
          <Star size={20} className="text-yellow-400 fill-yellow-400" />
          <span className="text-lg font-semibold ml-1">
            {calculateAvgRating(product.ratings)}
          </span>
        </div>
        {product.ratings.length > 0 && (
          <span className="text-gray-600">
            ({product.ratings.length} đánh giá)
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4">
        Nhà sản xuất: <span className="font-semibold">{product.producer}</span>
      </p>

      <div className="text-4xl font-bold text-primary mb-6">
        {formatPrice(product.price)}
      </div>

      <div className="flex items-center mb-6">
        <Package size={20} className="text-gray-400 mr-2" />
        <span
          className={`font-semibold ${
            product.noInStock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.noInStock > 0
            ? `Còn ${product.noInStock} sản phẩm`
            : "Hết hàng"}
        </span>
      </div>

      <div className="space-y-3 mb-8">
        <a
          href={`tel:${shopInfo.phoneUrl}`}
          className="btn-primary w-full flex items-center justify-center"
        >
          <Phone size={20} className="mr-2" />
          Liên hệ: {shopInfo.phone}
        </a>
        <a
          href={shopInfo.facebook}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full flex items-center justify-center"
        >
          <Facebook size={20} className="mr-2" />
          Facebook: {shopInfo.facebook}
        </a>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Danh mục</h3>
        <p className="text-gray-600">{product.categoryName}</p>
      </div>
    </div>
  );
}
