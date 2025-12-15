import { Plus } from "lucide-react";

interface PageHeaderProps {
  onAddClick: () => void;
}

export default function PageHeader({ onAddClick }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Blogs</h1>
        <p className="text-gray-600">Manage blog posts</p>
      </div>
      <button
        onClick={onAddClick}
        className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Plus size={20} />
        Add Blog
      </button>
    </div>
  );
}
