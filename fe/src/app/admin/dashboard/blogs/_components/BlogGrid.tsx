import { ApiBlog } from "@/lib/api";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  blogs: ApiBlog[];
  onEdit: (blog: ApiBlog) => void;
  onDelete: (id: number) => void;
}

export default function BlogGrid({ blogs, onEdit, onDelete }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.id}
          blog={blog}
          onEdit={() => onEdit(blog)}
          onDelete={() => onDelete(blog.id)}
        />
      ))}
    </div>
  );
}
