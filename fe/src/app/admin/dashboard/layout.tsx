"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  FolderOpen,
  FileText,
  LogOut,
  Key,
  User as UserIcon,
} from "lucide-react";
import { adminLogout } from "@/lib/adminApi";

interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const userStr = localStorage.getItem("adminUser");
    const mustReset = localStorage.getItem("mustResetPassword");

    if (!token) {
      router.push("/admin");
      return;
    }

    // If password reset is required and not on change-password page
    if (mustReset === "true" && pathname !== "/admin/change-password") {
      router.push("/admin/change-password");
      return;
    }

    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setCurrentUser(user);
      } catch (e) {
        console.error("Failed to parse user data");
      }
    }

    setIsAuthenticated(true);
  }, [router, pathname]);

  const handleLogout = async () => {
    if (isLoggingOut) return;

    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    setIsLoggingOut(true);

    try {
      const token = localStorage.getItem("adminToken");
      if (token) {
        await adminLogout(token);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");
      localStorage.removeItem("mustResetPassword");
      router.push("/admin");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/dashboard/products", label: "Products", icon: Package },
    {
      href: "/admin/dashboard/categories",
      label: "Categories",
      icon: FolderOpen,
    },
    { href: "/admin/dashboard/blogs", label: "Blogs", icon: FileText },
  ];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "editor":
        return "bg-blue-100 text-blue-800";
      case "content":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-sm text-gray-400">Chiến Hòa</p>
        </div>

        {/* User Info */}
        {currentUser && (
          <div className="px-6 py-4 bg-gray-800 border-y border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center">
                <UserIcon size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">
                  {currentUser.username}
                </p>
                <span
                  className={`inline-block px-2 py-0.5 text-xs rounded-full ${getRoleBadgeColor(
                    currentUser.role
                  )}`}
                >
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <Link
            href="/admin/change-password"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors w-full"
          >
            <Key size={20} />
            <span>Change Password</span>
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={20} />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  );
}
