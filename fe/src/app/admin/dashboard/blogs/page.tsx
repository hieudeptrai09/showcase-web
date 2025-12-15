"use client";

import { useState, useEffect } from "react";
import { fetchBlogs, ApiBlog } from "@/lib/api";
import { createBlog, updateBlog, deleteBlog } from "@/lib/adminApi";
import BlogGrid from "./_components/BlogGrid";
import BlogModal from "./_components/BlogModal";
import PageHeader from "./_components/PageHeader";
import { BlogFormData } from "./types";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<ApiBlog | null>(null);
  const [token, setToken] = useState("");

  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    author: "",
    heroImageUrl: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken") || "";
    setToken(adminToken);
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    const data = await fetchBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingBlog) {
        await updateBlog(token, editingBlog.id, formData);
      } else {
        await createBlog(token, formData);
      }

      await loadBlogs();
      closeModal();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      await deleteBlog(token, id);
      await loadBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const openModal = (blog?: ApiBlog) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        content: blog.content,
        author: blog.author,
        heroImageUrl: blog.heroImage || "",
        date: blog.date.split(" ")[0],
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: "",
        content: "",
        author: "",
        heroImageUrl: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingBlog(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PageHeader onAddClick={() => openModal()} />

      <BlogGrid blogs={blogs} onEdit={openModal} onDelete={handleDelete} />

      <BlogModal
        isOpen={isModalOpen}
        editingBlog={editingBlog}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </div>
  );
}
