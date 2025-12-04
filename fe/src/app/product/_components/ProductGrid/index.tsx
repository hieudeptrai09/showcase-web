"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProductFilters } from "../../_hooks/useProductFilters";
import { useProductData } from "../../_hooks/useProductData";
import ProductFilters from "./ProductFilters";
import ProductCount from "./ProductCount";
import ProductList from "./ProductList";
import LoadingSpinner from "./LoadingSpinner";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { products, categories, producers, loading } = useProductData();
  const [filters, setFilters] = useState({
    selectedCategory: "all",
    selectedProducer: "all",
    stockFilter: "all",
    sortBy: "name",
  });

  const filteredProducts = useProductFilters({
    products,
    selectedCategory: filters.selectedCategory,
    selectedProducer: filters.selectedProducer,
    stockFilter: filters.stockFilter,
    sortBy: filters.sortBy,
    searchQuery,
  });

  const handleFiltersChange = (newFilters: {
    selectedCategory: string;
    selectedProducer: string;
    stockFilter: string;
    sortBy: string;
  }) => {
    setFilters(newFilters);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <ProductFilters
        categories={categories}
        producers={producers}
        searchQuery={searchQuery}
        onFiltersChange={handleFiltersChange}
      />

      <ProductCount count={filteredProducts.length} />

      <ProductList products={filteredProducts} />
    </>
  );
}
