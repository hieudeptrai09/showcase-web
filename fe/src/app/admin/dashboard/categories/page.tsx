"use client";

import { fetchCategories, ApiCategory } from "@/lib/api";
import { createCategory, updateCategory, deleteCategory } from "@/lib/adminApi";
import CategoriesTable from "./_components/CategoriesTable";
import CategoryModal from "./_components/CategoryModal";
import { useAdminPage } from "../hooks/useAdminPage";
import AdminPageLayout from "../components/AdminPageLayout";

export default function CategoriesPage() {
  const {
    items: categories,
    loading,
    isModalOpen,
    editingItem: editingCategory,
    handleCreate,
    handleUpdate,
    handleDelete,
    openModal,
    closeModal,
  } = useAdminPage<ApiCategory>({
    fetchItems: fetchCategories,
    createItem: (token, name) => createCategory(token, name),
    updateItem: (token, id, name) => updateCategory(token, id, name),
    deleteItem: deleteCategory,
    deleteConfirmMessage: "Are you sure you want to delete this category?",
  });

  const handleSubmit = async (categoryName: string) => {
    try {
      if (editingCategory) {
        await handleUpdate(editingCategory.id, categoryName);
      } else {
        await handleCreate(categoryName);
      }
    } catch (error) {
      alert("Failed to save category");
    }
  };

  return (
    <AdminPageLayout
      title="Categories"
      description="Manage product categories"
      onAddClick={() => openModal()}
      addButtonText="Add Category"
      loading={loading}
    >
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
    </AdminPageLayout>
  );
}
