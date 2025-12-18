import { ApiBlog } from "@/lib/api";
import { BlogFormData } from "../types";
import BlogForm from "./BlogForm";
import { X } from "lucide-react";

interface BlogModalProps {
  isOpen: boolean;
  editingBlog: ApiBlog | null;
  formData: BlogFormData;
  setFormData: React.Dispatch<React.SetStateAction<BlogFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

export default function BlogModal({
  isOpen,
  editingBlog,
  formData,
  setFormData,
  onSubmit,
  onClose,
}: BlogModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 pb-4 border-b border-gray-300 shrink-0 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {editingBlog ? "Edit Blog" : "Add Blog"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 pt-4 overflow-y-auto">
          <BlogForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={onSubmit}
            onCancel={onClose}
            isEditing={!!editingBlog}
          />
        </div>
      </div>
    </div>
  );
}
