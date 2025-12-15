import { Edit2, Trash2 } from "lucide-react";
import { ApiCategory } from "@/lib/api";

interface CategoryRowProps {
  category: ApiCategory;
  onEdit: (category: ApiCategory) => void;
  onDelete: (id: number) => void;
}

export default function CategoryRow({
  category,
  onEdit,
  onDelete,
}: CategoryRowProps) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4 text-gray-800">{category.id}</td>
      <td className="px-6 py-4 text-gray-800 font-medium">{category.name}</td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onEdit(category)}
          className="text-blue-600 hover:text-blue-800 mr-4"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
