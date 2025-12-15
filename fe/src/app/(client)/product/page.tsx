import { Suspense } from "react";
import ProductGrid from "@/app/(client)/product/_components/ProductGrid";

export default function ProductPage() {
  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Danh mục sản phẩm
      </h1>

      <Suspense fallback={<div>Đang tải sản phẩm...</div>}>
        <ProductGrid />
      </Suspense>
    </div>
  );
}
