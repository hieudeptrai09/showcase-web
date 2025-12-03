"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Package, Phone, Facebook } from "lucide-react";
import { ApiProduct } from "@/lib/api";
import { shopInfo } from "@/lib/shopInfo";

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

  const handleTrackbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentImageIndex(parseInt(e.target.value));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev < product.images.length - 1 ? prev + 1 : prev
    );
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // Detect horizontal scrolling (trackpad swipe)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();

      if (e.deltaX > 0) {
        // Swiping left (next image)
        goToNextImage();
      } else if (e.deltaX < 0) {
        // Swiping right (previous image)
        goToPreviousImage();
      }
    }
  };

  // Touch support for mobile devices
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextImage();
    } else if (isRightSwipe) {
      goToPreviousImage();
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        {/* Image Carousel */}
        <div>
          <div
            className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 cursor-grab active:cursor-grabbing"
            onWheel={handleWheel}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {product.isHighlighted && (
              <div className="absolute top-4 right-4 z-10 bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold text-sm flex items-center gap-1 shadow-lg">
                <Star size={16} className="fill-white" />
                Nổi bật
              </div>
            )}
            <img
              src={
                product.images[currentImageIndex] ||
                "https://via.placeholder.com/600"
              }
              alt={product.name}
              className="w-full h-96 object-cover select-none"
              draggable="false"
            />
            {/* Image Counter */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm font-medium">
                {currentImageIndex + 1}/{product.images.length}
              </div>
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
                <div className="h-48 bg-gray-100 relative">
                  {relatedProduct.isHighlighted && (
                    <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-white px-2 py-1 rounded-full font-semibold text-xs flex items-center gap-1 shadow-md">
                      <Star size={14} className="fill-white" />
                      Nổi bật
                    </div>
                  )}
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
