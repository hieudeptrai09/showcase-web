import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { ApiCategory } from "@/lib/api";
import { useSearchParams } from "next/navigation";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterConfig {
  id: string;
  label: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  categories: ApiCategory[];
  producers: string[];
  searchQuery?: string;
  onFiltersChange: (filters: {
    selectedCategory: string;
    selectedProducer: string;
    stockFilter: string;
    sortBy: string;
  }) => void;
}

export default function ProductFilters({
  categories,
  producers,
  searchQuery = "",
  onFiltersChange,
}: ProductFiltersProps) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] =
    useState<string>(categoryFromUrl);
  const [selectedProducer, setSelectedProducer] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  // Notify parent when filters change (including initial load)
  useEffect(() => {
    onFiltersChange({
      selectedCategory,
      selectedProducer,
      stockFilter,
      sortBy,
    });
  }, [selectedCategory, selectedProducer, stockFilter, sortBy]);

  const handleFilterChange = (filterId: string, value: string) => {
    // Update local state
    switch (filterId) {
      case "category":
        setSelectedCategory(value);
        break;
      case "producer":
        setSelectedProducer(value);
        break;
      case "stock":
        setStockFilter(value);
        break;
      case "sort":
        setSortBy(value);
        break;
    }
  };

  const filters: FilterConfig[] = [
    {
      id: "category",
      label: "Danh mục",
      options: [
        { value: "all", label: "Tất cả" },
        ...categories.map((cat) => ({
          value: cat.id.toString(),
          label: cat.name,
        })),
      ],
    },
    {
      id: "producer",
      label: "Nhà sản xuất",
      options: producers.map((prod) => ({
        value: prod,
        label: prod === "all" ? "Tất cả" : prod,
      })),
    },
    {
      id: "stock",
      label: "Tình trạng",
      options: [
        { value: "all", label: "Tất cả" },
        { value: "instock", label: "Còn hàng" },
        { value: "outofstock", label: "Hết hàng" },
      ],
    },
    {
      id: "sort",
      label: "Sắp xếp theo",
      options: [
        { value: "name", label: "Tên A-Z" },
        { value: "price-asc", label: "Giá tăng dần" },
        { value: "price-desc", label: "Giá giảm dần" },
        { value: "rating", label: "Đánh giá cao nhất" },
        { value: "highlighted", label: "Nổi bật" },
      ],
    },
  ];

  const getFilterValue = (filterId: string): string => {
    switch (filterId) {
      case "category":
        return selectedCategory;
      case "producer":
        return selectedProducer;
      case "stock":
        return stockFilter;
      case "sort":
        return sortBy;
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center mb-4">
        <Filter className="text-primary mr-2" size={24} />
        <h2 className="text-xl font-semibold">Bộ lọc</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Từ khóa
          </label>
          <input
            type="text"
            value={searchQuery}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed"
            placeholder={searchQuery ? "" : "Không có từ khóa"}
          />
        </div>

        {filters.map((filter) => (
          <div key={filter.id}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {filter.label}
            </label>
            <select
              value={getFilterValue(filter.id)}
              onChange={(e) => handleFilterChange(filter.id, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
