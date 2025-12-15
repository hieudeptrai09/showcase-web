"use client";

import { useState, useEffect } from "react";
import {
  fetchCategories,
  fetchHighlightedProducts,
  ApiCategory,
  ApiProduct,
} from "@/lib/api";
import HeroSection from "./_components/HeroSection";
import CategoryProductSection from "./_components/CategoryProductSection";
import WhyChooseUs from "./_components/WhyChooseUs";
import LocationMap from "./_components/LocationMap";

export default function Home() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [highlightedProducts, setHighlightedProducts] = useState<ApiProduct[]>(
    []
  );

  useEffect(() => {
    async function loadData() {
      const [categoriesData, productsData] = await Promise.all([
        fetchCategories(),
        fetchHighlightedProducts(),
      ]);

      setCategories(categoriesData);
      setHighlightedProducts(productsData);
    }
    loadData();
  }, []);

  // Group products by category and count highlighted products per category
  const categoryProductCounts = categories.map((category) => {
    const products = highlightedProducts.filter(
      (p) => p.categoryId === category.id
    );

    return {
      category,
      products,
      highlightedCount: products.length,
    };
  });

  // Sort by number of highlighted products (descending) and take top 3
  const topCategories = categoryProductCounts
    .sort((a, b) => b.highlightedCount - a.highlightedCount)
    .filter((group) => group.products.length > 0)
    .slice(0, 3)
    .map((group) => ({
      category: group.category,
      products: group.products.slice(0, 4),
    }));

  return (
    <div>
      <HeroSection />

      {topCategories.map((group, index) => (
        <CategoryProductSection
          key={group.category.id}
          category={group.category}
          products={group.products}
          index={index}
        />
      ))}

      <WhyChooseUs />

      <LocationMap />
    </div>
  );
}
