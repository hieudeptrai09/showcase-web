"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Package,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
} from "lucide-react";
import { ApiProduct } from "@/lib/api";
import { shopInfo } from "@/lib/data";

interface ProductDetailClientProps {
  product: ApiProduct;
  relatedProducts: ApiProduct[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateAvgRating = (ratings: ApiProduct["ratings"]) => {
    if (ratings.length === 0) return 0;
    return (
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    ).toFixed(1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="container-custom py-12">
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Image Carousel */}
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={
                product.images[currentImageIndex] ||
                "https://via.placeholder.com/600"
              }
              alt={product.name}
              className="w-full h-96 object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`border-2 rounded-lg overflow-hidden ${
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

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
            Nhà sản xuất:{" "}
            <span className="font-semibold">{product.producer}</span>
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

          {/* Contact Button */}
          {/* <div className="space-y-3 mb-8">
            <a
              href={`tel:${shopInfo.phone}`}
              className="btn-primary w-full flex items-center justify-center"
            >
              <Phone size={20} className="mr-2" />
              Liên hệ: {shopInfo.phone}
            </a>
            <a
              href={`mailto:${shopInfo.email}?subject=Hỏi về ${product.name}`}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors w-full flex items-center justify-center"
            >
              <Mail size={20} className="mr-2" />
              Email: {shopInfo.email}
            </a>
          </div> */}

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">Danh mục</h3>
            <p className="text-gray-600">{product.categoryName}</p>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Mô tả sản phẩm
        </h2>
        <p className="text-gray-700 whitespace-pre-line">
          {product.description}
        </p>
      </div>

      {/* Q&A Section */}
      {product.qna.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Câu hỏi thường gặp
          </h2>
          <div className="space-y-6">
            {product.qna.map((item) => (
              <div key={item.id} className="border-b pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Q: {item.question}
                </h3>
                <p className="text-gray-600">A: {item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ratings Section */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Đánh giá từ khách hàng
        </h2>
        {product.ratings.length > 0 ? (
          <div className="space-y-6">
            {product.ratings.map((rating) => (
              <div key={rating.id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center mb-2">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < rating.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-800">
                    {rating.author}
                  </span>
                </div>
                <p className="text-gray-600">{rating.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Chưa có đánh giá nào.</p>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
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
                <div className="h-48 bg-gray-100">
                  <img
                    src={
                      relatedProduct.images[0] ||
                      "https://via.placeholder.com/400"
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
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
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
      )}
    </div>
  );
}
