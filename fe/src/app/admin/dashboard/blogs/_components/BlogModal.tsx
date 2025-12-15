import { ApiBlog } from "@/lib/api";
import { BlogFormData } from "../types";
import BlogForm from "./BlogForm";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full my-8 mx-4">
        <h2 className="text-2xl font-bold mb-6">
          {editingBlog ? "Edit Blog" : "Add Blog"}
        </h2>
        <BlogForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          onCancel={onClose}
          isEditing={!!editingBlog}
        />
      </div>
    </div>
  );
}
