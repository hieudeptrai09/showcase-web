import { ReactNode } from "react";
import { Plus } from "lucide-react";

interface AdminPageLayoutProps {
  title: string;
  description: string;
  onAddClick: () => void;
  addButtonText?: string;
  children: ReactNode;
  loading?: boolean;
}

export default function AdminPageLayout({
  title,
  description,
  onAddClick,
  addButtonText = "Add",
  children,
  loading = false,
}: AdminPageLayoutProps) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <button
          onClick={onAddClick}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          {addButtonText}
        </button>
      </div>

      {children}
    </div>
  );
}
