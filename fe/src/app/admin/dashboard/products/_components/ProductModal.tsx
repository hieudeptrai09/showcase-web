import { useState, useEffect } from "react";
import { ApiProduct, ApiCategory } from "@/lib/api";
import { createProduct, updateProduct } from "@/lib/adminApi";
import ProductForm from "./ProductForm";

interface ProductModalProps {
  product: ApiProduct | null;
  categories: ApiCategory[];
  token: string;
  onClose: () => void;
  onSuccess: () => void;
}

export interface ProductFormData {
  name: string;
  categoryId: number;
  price: number;
  noInStock: number;
  producer: string;
  description: string;
  isHighlighted: boolean;
  images: string[];
}

export default function ProductModal({
  product,
  categories,
  token,
  onClose,
  onSuccess,
}: ProductModalProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    categoryId: categories[0]?.id || 0,
    price: 0,
    noInStock: 0,
    producer: "",
    description: "",
    isHighlighted: false,
    images: [""],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        categoryId: product.categoryId,
        price: product.price,
        noInStock: product.noInStock,
        producer: product.producer,
        description: product.description,
        isHighlighted: product.isHighlighted,
        images: product.images.length > 0 ? product.images : [""],
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = {
        ...formData,
        images: formData.images.filter((img) => img.trim() !== ""),
      };

      if (product) {
        await updateProduct(token, product.id, productData);
      } else {
        await createProduct(token, productData);
      }

      onSuccess();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8 mx-4">
        <h2 className="text-2xl font-bold mb-6">
          {product ? "Edit Product" : "Add Product"}
        </h2>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={onClose}
          isEditing={!!product}
        />
      </div>
    </div>
  );
}
