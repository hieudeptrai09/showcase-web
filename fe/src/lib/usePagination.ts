import { useState, useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage?: number;
}

export function usePagination<T>({
  items,
  itemsPerPage = 20,
}: UsePaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate paginated items
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // Reset to page 1 when items change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to page 1 when total items change (e.g., after filtering)
  useMemo(() => {
    setCurrentPage(1);
  }, [items.length]);

  return {
    currentPage,
    paginatedItems,
    totalItems: items.length,
    itemsPerPage,
    onPageChange: handlePageChange,
  };
}
