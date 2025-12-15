import { Edit2, Trash2, Eye } from "lucide-react";
import { ApiBlog } from "@/lib/api";

interface BlogCardProps {
  blog: ApiBlog;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200">
        <img
          src={blog.heroImage || "https://via.placeholder.com/400x300"}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{blog.author}</span>
          <span className="mx-2">•</span>
          <span>{new Date(blog.date).toLocaleDateString("vi-VN")}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 text-sm">
            <span className="text-green-600">👍 {blog.like}</span>
            <span className="text-red-600">👎 {blog.dislike}</span>
          </div>
          <div className="flex gap-2">
            <a
              href={`/blog/${blog.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <Eye size={18} />
            </a>
            <button
              onClick={onEdit}
              className="text-blue-600 hover:text-blue-800"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={onDelete}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
