"use client";

import { useState, useEffect } from "react";
import { Package, FolderOpen, FileText, TrendingUp } from "lucide-react";
import { fetchProducts, fetchCategories, fetchBlogs } from "@/lib/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    blogs: 0,
    highlightedProducts: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const [products, categories, blogs] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
        fetchBlogs(),
      ]);

      setStats({
        products: products.length,
        categories: categories.length,
        blogs: blogs.length,
        highlightedProducts: products.filter((p) => p.isHighlighted).length,
      });
    }
    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Products",
      value: stats.products,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: FolderOpen,
      color: "bg-green-500",
    },
    {
      title: "Blog Posts",
      value: stats.blogs,
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      title: "Highlighted Products",
      value: stats.highlightedProducts,
      icon: TrendingUp,
      color: "bg-yellow-500",
    },
  ];

  const dashboardButtons = [
    {
      link: "/admin/dashboard/products",
      title: "Manage Products",
      description: "Add, edit, or delete products",
    },
    {
      link: "/admin/dashboard/categories",
      title: "Manage Products",
      description: "Organize your product categories",
    },
    {
      link: "/admin/dashboard/blogs",
      title: "Manage Blogs",
      description: "Create and edit blog posts",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to the admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardButtons.map((button, index) => (
            <a
              href={button.link}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-800 mb-2">
                {button.title}
              </h3>
              <p className="text-sm text-gray-600">{button.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
