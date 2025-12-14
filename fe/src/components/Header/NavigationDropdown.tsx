"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { fetchCategories, ApiCategory } from "@/lib/api";

interface NavigationDropdownProps {
  isActive: boolean;
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export default function NavigationDropdown({
  isActive,
  isMobile = false,
  onLinkClick,
}: NavigationDropdownProps) {
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    async function loadCategories() {
      const categoriesData = await fetchCategories();
      setCategories(categoriesData);
    }
    loadCategories();
  }, []);

  if (isMobile) {
    // Mobile version - direct link (no dropdown)
    return (
      <Link
        href="/product"
        className={`text-gray-700 hover:font-semibold ${
          isActive && "text-primary"
        }`}
        onClick={onLinkClick}
      >
        Sản phẩm
      </Link>
    );
  }

  // Desktop version - hover dropdown
  return (
    <div className="group">
      <Link
        href="/product"
        className={`text-gray-700 hover:font-semibold flex items-center ${
          isActive && "text-primary"
        }`}
      >
        Sản phẩm
        <ChevronDown size={16} className="ml-1" />
      </Link>

      {categories.length > 0 && (
        <div className="absolute top-full right-0 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-[600px]">
            <Link
              href="/product"
              className="block px-4 py-2 mb-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors rounded"
            >
              Tất cả sản phẩm
            </Link>
            <div className="border-t border-gray-200 mb-3"></div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/product?category=${category.id}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors rounded whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
