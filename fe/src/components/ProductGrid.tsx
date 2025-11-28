"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Filter, Star, Package } from "lucide-react";
import {
  fetchProducts,
  fetchCategories,
  ApiProduct,
  ApiCategory,
} from "@/lib/api";

export default function ProductGrid() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProducer, setSelectedProducer] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  useEffect(() => {
    async function loadData() {
      const [productsData, categoriesData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    }
    loadData();
  }, []);

  const producers = useMemo(() => {
    const prods = Array.from(new Set(products.map((p) => p.producer)));
    return ["all", ...prods];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.categoryId.toString() === selectedCategory
      );
    }

    if (selectedProducer !== "all") {
      filtered = filtered.filter((p) => p.producer === selectedProducer);
    }

    if (stockFilter === "instock") {
      filtered = filtered.filter((p) => p.noInStock > 0);
    } else if (stockFilter === "outofstock") {
      filtered = filtered.filter((p) => p.noInStock === 0);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          const avgA =
            a.ratings.length > 0
              ? a.ratings.reduce((sum, r) => sum + r.rating, 0) /
                a.ratings.length
              : 0;
          const avgB =
            b.ratings.length > 0
              ? b.ratings.reduce((sum, r) => sum + r.rating, 0) /
                b.ratings.length
              : 0;
          return avgB - avgA;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, selectedCategory, selectedProducer, stockFilter, sortBy]);

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

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Đang tải sản phẩm...</p>
      </div>
    );
  }

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="text-primary mr-2" size={24} />
          <h2 className="text-xl font-semibold">Bộ lọc</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tất cả</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nhà sản xuất
            </label>
            <select
              value={selectedProducer}
              onChange={(e) => setSelectedProducer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {producers.map((prod) => (
                <option key={prod} value={prod}>
                  {prod === "all" ? "Tất cả" : prod}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tình trạng
            </label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tất cả</option>
              <option value="instock">Còn hàng</option>
              <option value="outofstock">Hết hàng</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sắp xếp theo
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name">Tên A-Z</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="rating">Đánh giá cao nhất</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-6">
        <p className="text-gray-600">
          Hiển thị {filteredProducts.length} sản phẩm
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
            >
              <div className="relative h-48 bg-gray-100">
                <img
                  src={product.images[0] || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.noInStock === 0 && (
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

                <p className="text-sm text-gray-500 mb-2">{product.producer}</p>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                    <span className="text-sm text-gray-600 ml-1">
                      {calculateAvgRating(product.ratings)}
                    </span>
                  </div>
                  {product.ratings.length > 0 && (
                    <span className="text-sm text-gray-400 ml-2">
                      ({product.ratings.length} đánh giá)
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
                          product.noInStock > 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {product.noInStock > 0
                          ? `Còn ${product.noInStock} sản phẩm`
                          : "Hết hàng"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </>
  );
}
