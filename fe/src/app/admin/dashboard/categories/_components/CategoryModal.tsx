import { ApiCategory } from "@/lib/api";
import CategoryForm from "./CategoryForm";
import { X } from "lucide-react";

interface CategoryModalProps {
  isOpen: boolean;
  category: ApiCategory | null;
  onClose: () => void;
  onSubmit: (categoryName: string) => void;
}

export default function CategoryModal({
  isOpen,
  category,
  onClose,
  onSubmit,
}: CategoryModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {category ? "Edit Category" : "Add Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <CategoryForm
          initialValue={category?.name || ""}
          isEditing={!!category}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </div>
    </div>
  );
}
