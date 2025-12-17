import { useState, useEffect } from "react";
import { ApiProduct, ApiCategory } from "@/lib/api";
import { createProduct, updateProduct, createCategory } from "@/lib/adminApi";
import ProductForm from "./ProductForm";
import CategoryModal from "../../categories/_components/CategoryModal";

interface ProductModalProps {
  product: ApiProduct | null;
  categories: ApiCategory[];
  token: string;
  onClose: () => void;
  onSuccess: () => void;
  onCategoryAdded: () => void;
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
  onCategoryAdded,
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

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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

  const handleAddCategory = () => {
    setIsCategoryModalOpen(true);
  };

  const handleCategorySubmit = async (categoryName: string) => {
    try {
      const result = await createCategory(token, categoryName);

      if (result && !result.error) {
        setIsCategoryModalOpen(false);
        await onCategoryAdded();
      } else {
        alert(result.message || "Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
          <div className="p-8 pb-4 border-b border-gray-300 shrink-0">
            <h2 className="text-2xl font-bold">
              {product ? "Edit Product" : "Add Product"}
            </h2>
          </div>

          <div className="p-8 pt-4 overflow-y-auto">
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={onClose}
              onAddCategory={handleAddCategory}
              isEditing={!!product}
            />
          </div>
        </div>
      </div>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        category={null}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleCategorySubmit}
      />
    </>
  );
}
