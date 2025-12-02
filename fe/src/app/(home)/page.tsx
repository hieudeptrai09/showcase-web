"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { shopInfo } from "@/lib/shopInfo";
import { useState, useEffect } from "react";
import {
  fetchCategories,
  fetchHighlightedProducts,
  ApiCategory,
  ApiProduct,
} from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [highlightedProducts, setHighlightedProducts] = useState<ApiProduct[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchHighlightedProducts(),
        ]);

        setCategories(categoriesData);
        setHighlightedProducts(productsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Group products by category
  const productsByCategory = categories
    .map((category) => ({
      category,
      products: highlightedProducts
        .filter((p) => p.categoryId === category.id)
        .slice(0, 4),
    }))
    .filter((group) => group.products.length > 0);

  if (loading) {
    return (
      <section className="container-custom py-16">
        <div className="text-center py-8">
          <p className="text-gray-500">Đang tải sản phẩm...</p>
        </div>
      </section>
    );
  }

  if (productsByCategory.length === 0) {
    return (
      <section className="container-custom py-16">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Sản phẩm nổi bật
          </h2>
          <p className="text-gray-500">Chưa có sản phẩm nổi bật nào.</p>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container-custom py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">{shopInfo.name}</h1>
            <p className="text-2xl mb-4">{shopInfo.tagline}</p>
            <p className="text-lg mb-8 text-blue-100">{shopInfo.description}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/product"
                className="btn-primary bg-white text-primary hover:bg-gray-100"
              >
                Xem sản phẩm
                <ArrowRight className="inline ml-2" size={20} />
              </Link>
              <Link
                href="/maps"
                className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors"
              >
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products by Category */}
      {productsByCategory.map((group, index) => (
        <section
          key={group.category.id}
          className={`py-16 ${index % 2 === 1 ? "bg-gray-50" : ""}`}
        >
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {group.category.name}
                </h2>
                <p className="text-gray-600">
                  Sản phẩm nổi bật trong danh mục{" "}
                  {group.category.name.toLowerCase()}
                </p>
              </div>
              <Link
                href={`/product?category=${group.category.id}`}
                className="text-primary hover:underline flex items-center"
              >
                Xem tất cả
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {group.products.map((product) => {
                const avgRating =
                  product.ratings.length > 0
                    ? product.ratings.reduce((sum, r) => sum + r.rating, 0) /
                      product.ratings.length
                    : 0;

                return (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      manufacturer: product.producer,
                      inStock: product.noInStock > 0,
                      stock: product.noInStock,
                      category: product.categoryName,
                      image:
                        product.images[0] || "https://via.placeholder.com/400",
                      featured: product.isHighlighted,
                      rating: parseFloat(avgRating.toFixed(1)),
                      reviews: product.ratings.map((r) => ({
                        ...r,
                        date: new Date().toISOString(),
                      })),
                      qna: product.qna.map((q) => ({
                        ...q,
                        author: "Shop",
                        date: new Date().toISOString(),
                      })),
                    }}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Tại sao chọn chúng tôi?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Sản phẩm chính hãng
              </h3>
              <p className="text-gray-600">
                100% sản phẩm chính hãng, bảo hành đầy đủ
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Giá cả hợp lý</h3>
              <p className="text-gray-600">Cam kết giá tốt nhất thị trường</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hỗ trợ nhiệt tình</h3>
              <p className="text-gray-600">
                Đội ngũ tư vấn chuyên nghiệp, tận tâm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="container-custom py-16">
        <div className="flex items-center mb-8">
          <svg
            className="text-primary mr-2"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Vị trí cửa hàng
            </h2>
            <p className="text-gray-600">{shopInfo.address}</p>
          </div>
        </div>
        <div
          className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
          style={{ height: "400px" }}
        >
          <iframe
            src={shopInfo.googleMapsUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="text-center mt-6">
          <Link href="/maps" className="btn-primary">
            Xem hướng dẫn chi tiết
          </Link>
        </div>
      </section>
    </div>
  );
}
