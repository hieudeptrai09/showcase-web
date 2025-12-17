"use client";

import { useState, useEffect } from "react";
import {
  fetchProducts,
  fetchCategories,
  ApiProduct,
  ApiCategory,
} from "@/lib/api";
import { deleteProduct } from "@/lib/adminApi";
import ProductsTable from "./_components/ProductTable";
import ProductModal from "./_components/ProductModal";
import AdminPageLayout from "../components/AdminPageLayout";
import { useAdminPage } from "../hooks/useAdminPage";

export default function ProductsPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  const {
    items: products,
    loading,
    isModalOpen,
    editingItem: editingProduct,
    token,
    handleDelete,
    openModal,
    closeModal,
    loadItems: loadProducts,
  } = useAdminPage<ApiProduct>({
    fetchItems: fetchProducts,
    createItem: () => Promise.resolve({}), // Handled in ProductModal
    updateItem: () => Promise.resolve({}), // Handled in ProductModal
    deleteItem: deleteProduct,
    deleteConfirmMessage: "Are you sure you want to delete this product?",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const data = await fetchCategories();
    setCategories(data);
  };

  const handleModalSuccess = async () => {
    await loadProducts();
    closeModal();
  };

  const handleCategoryAdded = async () => {
    await loadCategories();
  };

  return (
    <AdminPageLayout
      title="Products"
      description="Manage your products"
      onAddClick={() => openModal()}
      addButtonText="Add Product"
      loading={loading}
    >
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
          onCategoryAdded={handleCategoryAdded}
        />
      )}
    </AdminPageLayout>
  );
}
