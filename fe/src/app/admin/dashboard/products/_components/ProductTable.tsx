import { Edit2, Trash2, Star } from "lucide-react";
import { ApiProduct } from "@/lib/api";

interface ProductsTableProps {
  products: ApiProduct[];
  onEdit: (product: ApiProduct) => void;
  onDelete: (id: number) => void;
}

export default function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  let header = [
    "ID",
    "Name",
    "Category",
    "Price",
    "Stock",
    "Featured",
    "Actions",
  ];
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              {header.map((headerCol, id) => (
                <th
                  key={id}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-700"
                >
                  {headerCol}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800">{product.id}</td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {product.categoryName}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={
                      product.noInStock > 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {product.noInStock}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {product.isHighlighted && (
                    <Star
                      size={18}
                      className="text-yellow-400 fill-yellow-400 inline"
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onEdit(product)}
                    className="text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
