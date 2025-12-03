import { useMemo } from "react";
import { ApiProduct } from "@/lib/api";

interface UseProductFiltersProps {
  products: ApiProduct[];
  selectedCategory: string;
  selectedProducer: string;
  stockFilter: string;
  sortBy: string;
}

export function useProductFilters({
  products,
  selectedCategory,
  selectedProducer,
  stockFilter,
  sortBy,
}: UseProductFiltersProps) {
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p.categoryId.toString() === selectedCategory
      );
    }

    // Filter by producer
    if (selectedProducer !== "all") {
      filtered = filtered.filter((p) => p.producer === selectedProducer);
    }

    // Filter by stock
    if (stockFilter === "instock") {
      filtered = filtered.filter((p) => p.noInStock > 0);
    } else if (stockFilter === "outofstock") {
      filtered = filtered.filter((p) => p.noInStock === 0);
    }

    // Sort products
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
        case "highlighted":
          if (a.isHighlighted === b.isHighlighted) {
            return a.name.localeCompare(b.name);
          }
          return a.isHighlighted ? -1 : 1;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, selectedCategory, selectedProducer, stockFilter, sortBy]);

  return filteredProducts;
}
