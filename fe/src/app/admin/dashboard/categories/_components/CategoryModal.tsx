import { ApiCategory } from "@/lib/api";
import CategoryForm from "./CategoryForm";

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">
          {category ? "Edit Category" : "Add Category"}
        </h2>
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
