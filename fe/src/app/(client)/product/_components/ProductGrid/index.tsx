"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProductData } from "../../_hooks/useProductData";
import { useProductFilters } from "../../_hooks/useProductFilters";
import { usePagination } from "../../../../../lib/usePagination";
import ProductFilters from "./ProductFilters";
import ProductCount from "./ProductCount";
import ProductList from "./ProductList";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "@/components/Pagination";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryFromUrl = searchParams.get("category") || "all";

  const { products, categories, producers, loading } = useProductData();
  const [filters, setFilters] = useState({
    selectedCategory: categoryFromUrl,
    selectedProducer: "all",
    stockFilter: "all",
    sortBy: "name",
  });

  // Update filters when URL category changes
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: categoryFromUrl,
    }));
  }, [categoryFromUrl]);

  const filteredProducts = useProductFilters({
    products,
    selectedCategory: filters.selectedCategory,
    selectedProducer: filters.selectedProducer,
    stockFilter: filters.stockFilter,
    sortBy: filters.sortBy,
    searchQuery,
  });

  const {
    currentPage,
    paginatedItems,
    totalItems,
    itemsPerPage,
    onPageChange,
  } = usePagination({
    items: filteredProducts,
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

      <ProductCount count={totalItems} />

      <ProductList products={paginatedItems} />

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </>
  );
}
