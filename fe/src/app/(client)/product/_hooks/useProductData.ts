import { useState, useEffect, useMemo } from "react";
import {
  fetchProducts,
  fetchCategories,
  ApiProduct,
  ApiCategory,
} from "@/lib/api";

export function useProductData() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

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

  return { products, categories, producers, loading };
}
