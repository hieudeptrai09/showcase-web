import { useState, useEffect } from "react";

interface CategoryFormProps {
  initialValue: string;
  isEditing: boolean;
  onSubmit: (categoryName: string) => void;
  onCancel: () => void;
}

export default function CategoryForm({
  initialValue,
  isEditing,
  onSubmit,
  onCancel,
}: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState(initialValue);

  useEffect(() => {
    setCategoryName(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(categoryName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {isEditing ? "Update" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
