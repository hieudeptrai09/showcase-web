import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";
import { fetchProduct, fetchProducts } from "@/lib/api";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProduct(parseInt(params.id));

  if (!product) {
    notFound();
  }

  const allProducts = await fetchProducts();
  const relatedProducts = allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <ProductDetailClient product={product} relatedProducts={relatedProducts} />
  );
}
