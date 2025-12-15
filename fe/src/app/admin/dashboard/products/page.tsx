"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import {
  fetchProducts,
  fetchCategories,
  ApiProduct,
  ApiCategory,
} from "@/lib/api";
import { deleteProduct } from "@/lib/adminApi";
import ProductsTable from "./_components/ProductTable";
import ProductModal from "./_components/ProductModal";

export default function ProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken") || "";
    setToken(adminToken);
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [productsData, categoriesData] = await Promise.all([
      fetchProducts(),
      fetchCategories(),
    ]);
    setProducts(productsData);
    setCategories(categoriesData);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(token, id);
      await loadData();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const openModal = (product?: ApiProduct) => {
    setEditingProduct(product || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleModalSuccess = async () => {
    await loadData();
    closeModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Products</h1>
          <p className="text-gray-600">Manage your products</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      <ProductsTable
        products={products}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          token={token}
          onClose={closeModal}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}
