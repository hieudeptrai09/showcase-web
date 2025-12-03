"use client";

import { useState, useMemo, useEffect } from "react";
import { Filter } from "lucide-react";
import {
  fetchProducts,
  fetchCategories,
  ApiProduct,
  ApiCategory,
} from "@/lib/api";
import ProductCard from "@/components/ProductCard";

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

  const calculateAvgRating = (ratings: ApiProduct["ratings"]) => {
    if (ratings.length === 0) return Number(0).toFixed(1);
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
            <ProductCard
              key={product.id}
              {...product}
              image={product.images[0]}
              rating={parseFloat(calculateAvgRating(product.ratings))}
              reviewCount={product.ratings.length}
            />
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
