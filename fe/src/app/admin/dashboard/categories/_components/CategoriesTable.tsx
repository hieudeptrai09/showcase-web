import { ApiCategory } from "@/lib/api";
import CategoryRow from "./CategoryRow";

interface CategoriesTableProps {
  categories: ApiCategory[];
  onEdit: (category: ApiCategory) => void;
  onDelete: (id: number) => void;
}

export default function CategoriesTable({
  categories,
  onEdit,
  onDelete,
}: CategoriesTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
              Name
            </th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
