"use client";

import { useState } from "react";
import { fetchBlogs, ApiBlog } from "@/lib/api";
import { createBlog, updateBlog, deleteBlog } from "@/lib/adminApi";
import BlogGrid from "./_components/BlogGrid";
import BlogModal from "./_components/BlogModal";
import { BlogFormData } from "./types";
import { useAdminPage } from "../hooks/useAdminPage";
import AdminPageLayout from "../components/AdminPageLayout";

export default function BlogsPage() {
  const {
    items: blogs,
    loading,
    isModalOpen,
    editingItem: editingBlog,
    handleCreate,
    handleUpdate,
    handleDelete,
    openModal: openModalBase,
    closeModal,
  } = useAdminPage<ApiBlog>({
    fetchItems: fetchBlogs,
    createItem: createBlog,
    updateItem: updateBlog,
    deleteItem: deleteBlog,
    deleteConfirmMessage: "Are you sure you want to delete this blog?",
  });

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    author: "",
    heroImageUrl: "",
    date: new Date().toISOString().split("T")[0],
  });

  const openModal = (blog?: ApiBlog) => {
    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        heroImageUrl: blog.heroImage || "",
        date: blog.date.split(" ")[0],
      });
    } else {
      setFormData({
        title: "",
        content: "",
        author: "",
        heroImageUrl: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
    openModalBase(blog);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBlog) {
        await handleUpdate(editingBlog.id, formData);
      } else {
        await handleCreate(formData);
      }
    } catch (error) {
      alert("Failed to save blog");
    }
  };

  return (
    <AdminPageLayout
      title="Blogs"
      description="Manage blog posts"
      onAddClick={() => openModal()}
      addButtonText="Add Blog"
      loading={loading}
    >
      <BlogGrid blogs={blogs} onEdit={openModal} onDelete={handleDelete} />

      <BlogModal
        isOpen={isModalOpen}
        editingBlog={editingBlog}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </AdminPageLayout>
  );
}
