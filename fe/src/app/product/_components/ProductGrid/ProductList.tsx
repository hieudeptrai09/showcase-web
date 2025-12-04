import { ApiProduct } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

interface ProductListProps {
  products: ApiProduct[];
}

export default function ProductList({ products }: ProductListProps) {
  const calculateAvgRating = (ratings: ApiProduct["ratings"]) => {
    if (ratings.length === 0) return Number(0).toFixed(1);
    return (
      ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
    ).toFixed(1);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          {...product}
          image={product.images[0] || "https://via.placeholder.com/1200x600"}
          rating={parseFloat(calculateAvgRating(product.ratings))}
          reviewCount={product.ratings.length}
        />
      ))}
    </div>
  );
}
