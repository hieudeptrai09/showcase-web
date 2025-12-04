import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ApiCategory, ApiProduct } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface CategoryProductSectionProps {
  category: ApiCategory;
  products: ApiProduct[];
  index: number;
}

export default function CategoryProductSection({
  category,
  products,
  index,
}: CategoryProductSectionProps) {
  return (
    <section className={`py-16 ${index % 2 === 1 ? "bg-gray-50" : ""}`}>
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {category.name}
            </h2>
            <p className="text-gray-600">
              Sản phẩm nổi bật trong danh mục {category.name.toLowerCase()}
            </p>
          </div>
          <Link
            href={`/product?category=${category.id}`}
            className="text-primary hover:underline flex items-center"
          >
            Xem tất cả
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const avgRating =
              product.ratings.length > 0
                ? product.ratings.reduce((sum, r) => sum + r.rating, 0) /
                  product.ratings.length
                : 0;

            return (
              <ProductCard
                key={product.id}
                {...product}
                image={
                  product.images[0] ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"
                }
                rating={parseFloat(avgRating.toFixed(1))}
                reviewCount={product.ratings.length}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
