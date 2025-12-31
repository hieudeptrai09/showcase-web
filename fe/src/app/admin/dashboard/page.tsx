"use client";

import { useState, useEffect } from "react";
import {
  Package,
  FolderOpen,
  FileText,
  TrendingUp,
  Shield,
} from "lucide-react";
import { fetchProducts, fetchCategories, fetchBlogs } from "@/lib/api";

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    blogs: 0,
    highlightedProducts: 0,
  });
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    // Load user info
    const userStr = localStorage.getItem("adminUser");
    if (userStr) {
      try {
        setCurrentUser(JSON.parse(userStr));
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }

    // Load stats
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

  const getQuickActions = () => {
    if (!currentUser) return [];

    const actions = [];

    // All users can manage blogs
    actions.push({
      link: "/admin/dashboard/blogs",
      title: "Manage Blogs",
      description: "Create and edit blog posts",
    });

    // Editors and admins can manage products and categories
    if (currentUser.role === "admin" || currentUser.role === "editor") {
      actions.push(
        {
          link: "/admin/dashboard/products",
          title: "Manage Products",
          description: "Add, edit, or delete products",
        },
        {
          link: "/admin/dashboard/categories",
          title: "Manage Categories",
          description: "Organize your product categories",
        }
      );
    }

    return actions;
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "admin":
        return "Full system access";
      case "editor":
        return "Can manage products, categories, and blogs";
      case "content":
        return "Can create and edit blog posts";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {currentUser?.username || "Admin"}!
        </p>
      </div>

      {/* User Role Info */}
      {currentUser && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-primary text-white p-3 rounded-lg">
              <Shield size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Your Role:{" "}
                <span className="text-primary">{currentUser.role}</span>
              </h3>
              <p className="text-gray-600">
                {getRoleDescription(currentUser.role)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 transition-shadow hover:shadow-lg"
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

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getQuickActions().map((button, index) => (
            <a
              key={index}
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

        {currentUser?.role === "content" && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> As a content creator, you have access to
              blog management. Contact an administrator if you need access to
              other features.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
