"use client";

import { ApiProduct } from "@/lib/api";
import ProductImageCarousel from "./ProductImageCarousel";
import ProductInfo from "./ProductInfo";
import ProductDescription from "./ProductDescription";
import ProductQnA from "./ProductQnA";
import ProductRatings from "./ProductRatings";
import RelatedProducts from "./RelatedProducts";

interface ProductDetailClientProps {
  product: ApiProduct;
  relatedProducts: ApiProduct[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  return (
    <div className="container-custom py-12">
      <div className="grid lg:grid-cols-2 gap-12 mb-12">
        <ProductImageCarousel
          images={product.images}
          productName={product.name}
          isHighlighted={product.isHighlighted}
        />
        <ProductInfo product={product} />
      </div>

      <ProductDescription description={product.description} />

      {product.qna.length > 0 && <ProductQnA qna={product.qna} />}

      <ProductRatings ratings={product.ratings} />

      {relatedProducts.length > 0 && (
        <RelatedProducts relatedProducts={relatedProducts} />
      )}
    </div>
  );
}
