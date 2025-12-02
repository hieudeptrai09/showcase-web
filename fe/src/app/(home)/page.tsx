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

  // Group products by category
  const productsByCategory = categories
    .map((category) => ({
      category,
      products: highlightedProducts
        .filter((p) => p.categoryId === category.id)
        .slice(0, 4),
    }))
    .filter((group) => group.products.length > 0);

  return (
    <div>
      <HeroSection />

      {productsByCategory.map((group, index) => (
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
