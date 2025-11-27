"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/data";
import { Filter } from "lucide-react";

export default function CatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Get unique categories and manufacturers
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ["all", ...cats];
  }, []);

  const manufacturers = useMemo(() => {
    const mfrs = Array.from(new Set(products.map((p) => p.manufacturer)));
    return ["all", ...mfrs];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Manufacturer filter
    if (selectedManufacturer !== "all") {
      filtered = filtered.filter(
        (p) => p.manufacturer === selectedManufacturer
      );
    }

    // Stock filter
    if (stockFilter === "instock") {
      filtered = filtered.filter((p) => p.inStock);
    } else if (stockFilter === "outofstock") {
      filtered = filtered.filter((p) => !p.inStock);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [selectedCategory, selectedManufacturer, stockFilter, sortBy]);

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Danh mục sản phẩm
      </h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="text-primary mr-2" size={24} />
          <h2 className="text-xl font-semibold">Bộ lọc</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Danh mục
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Tất cả" : cat}
                </option>
              ))}
            </select>
          </div>

          {/* Manufacturer Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hãng sản xuất
            </label>
            <select
              value={selectedManufacturer}
              onChange={(e) => setSelectedManufacturer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {manufacturers.map((mfr) => (
                <option key={mfr} value={mfr}>
                  {mfr === "all" ? "Tất cả" : mfr}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
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

          {/* Sort */}
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
        </div>
      )}
    </div>
  );
}
