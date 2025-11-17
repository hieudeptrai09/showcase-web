"use client";

import { use } from "react";
import { products, shopInfo } from "@/lib/data";
import { Star, Package, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <Link href="/catalog" className="btn-primary">
            Quay lại danh mục
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="container-custom py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary">
          Trang chủ
        </Link>
        {" / "}
        <Link href="/catalog" className="hover:text-primary">
          Sản phẩm
        </Link>
        {" / "}
        <span className="text-gray-800">{product.name}</span>
      </div>

      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} / 5.0 ({product.reviews.length} đánh giá)
            </span>
          </div>

          <div className="mb-6">
            <span className="text-sm text-gray-600">Hãng sản xuất: </span>
            <span className="text-sm font-semibold">
              {product.manufacturer}
            </span>
          </div>

          <div className="text-4xl font-bold text-primary mb-6">
            {formatPrice(product.price)}
          </div>

          <div className="flex items-center mb-6">
            <Package className="text-gray-400 mr-2" size={20} />
            <span
              className={`font-semibold ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? `Còn ${product.stock} sản phẩm` : "Hết hàng"}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Mô tả sản phẩm</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Liên hệ để mua hàng</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="text-primary mr-3" size={20} />
                <a
                  href={`tel:${shopInfo.phone}`}
                  className="text-gray-700 hover:text-primary"
                >
                  {shopInfo.phone}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="text-primary mr-3" size={20} />
                <a
                  href={`mailto:${shopInfo.email}`}
                  className="text-gray-700 hover:text-primary"
                >
                  {shopInfo.email}
                </a>
              </div>
              <div className="flex items-center">
                <MessageCircle className="text-primary mr-3" size={20} />
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-primary"
                >
                  Gửi tin nhắn
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Đánh giá từ khách hàng
          </h2>
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white border border-gray-200 rounded-lg p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Q&A Section */}
      {product.qna.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Hỏi đáp</h2>
          <div className="space-y-6">
            {product.qna.map((qa) => (
              <div
                key={qa.id}
                className="bg-blue-50 border border-blue-200 rounded-lg p-6"
              >
                <div className="mb-4">
                  <p className="font-semibold text-gray-800 mb-1">Câu hỏi:</p>
                  <p className="text-gray-700">{qa.question}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {qa.author} -{" "}
                    {new Date(qa.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-primary mb-1">Trả lời:</p>
                  <p className="text-gray-700">{qa.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
