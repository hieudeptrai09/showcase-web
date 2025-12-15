"use client";

import { useState, useEffect } from "react";
import { fetchCategories, ApiCategory } from "@/lib/api";
import { createCategory, updateCategory, deleteCategory } from "@/lib/adminApi";
import CategoriesTable from "./_components/CategoriesTable";
import CategoryModal from "./_components/CategoryModal";
import PageHeader from "./_components/PageHeader";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ApiCategory | null>(
    null
  );
  const [token, setToken] = useState("");

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken") || "";
    setToken(adminToken);
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    const data = await fetchCategories();
    setCategories(data);
    setLoading(false);
  };

  const handleSubmit = async (categoryName: string) => {
    try {
      if (editingCategory) {
        await updateCategory(token, editingCategory.id, categoryName);
      } else {
        await createCategory(token, categoryName);
      }

      await loadCategories();
      closeModal();
    } catch (error) {
      console.error("Error saving category:", error);
      alert("Failed to save category");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      const result = await deleteCategory(token, id);
      if (result.success) {
        await loadCategories();
      } else {
        alert(result.message || "Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category");
    }
  };

  const openModal = (category?: ApiCategory) => {
    setEditingCategory(category || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageHeader onAddClick={() => openModal()} />

      <CategoriesTable
        categories={categories}
        onEdit={openModal}
        onDelete={handleDelete}
      />

      <CategoryModal
        isOpen={isModalOpen}
        category={editingCategory}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
