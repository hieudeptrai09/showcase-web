"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, ThumbsUp, ThumbsDown } from "lucide-react";
import { fetchBlogs, ApiBlog } from "@/lib/api";
import { usePagination } from "@/lib/usePagination";
import Pagination from "@/components/Pagination";

export default function BlogGrid() {
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      const blogsData = await fetchBlogs();
      setBlogs(blogsData);
      setLoading(false);
    }
    loadBlogs();
  }, []);

  const {
    currentPage,
    paginatedItems,
    totalItems,
    itemsPerPage,
    onPageChange,
  } = usePagination({
    items: blogs,
  });

  if (loading) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Đang tải bài viết...</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">Chưa có bài viết nào.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedItems.map((blog) => (
          <Link
            href={`/blog/${blog.id}`}
            key={blog.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                src={blog.heroImage || "https://via.placeholder.com/600x400"}
                alt={blog.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {blog.title}
              </h2>

              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {new Date(blog.date).toLocaleDateString("vi-VN")}
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  {blog.author}
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4 text-sm">
                <div className="flex items-center text-gray-700">
                  <ThumbsUp size={16} className="mr-1" />
                  <span>{blog.like}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ThumbsDown size={16} className="mr-1" />
                </div>
              </div>

              <p className="text-primary hover:underline flex items-center font-semibold">
                Đọc thêm
                <ArrowRight size={16} className="ml-2" />
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </>
  );
}
