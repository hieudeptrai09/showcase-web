"use client";

import { useState } from "react";
import { Star, Package, Phone } from "lucide-react";
import { ApiProduct } from "@/lib/api";
import { formatPrice, calculateAvgRating } from "../../_utils/fns";
import ContactModal from "./ContactModal";

interface ProductInfoProps {
  product: ApiProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

      <div className="mb-8">
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="btn-primary w-full flex items-center justify-center text-lg py-3"
        >
          <Phone size={24} className="mr-2" />
          Liên hệ đặt hàng
        </button>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-2">Danh mục</h3>
        <p className="text-gray-600">{product.categoryName}</p>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
