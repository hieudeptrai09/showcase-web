import { Suspense } from "react";
import BlogGrid from "@/app/blog/_components/BlogGrid";

export default function BlogPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Tin tức, hướng dẫn và kiến thức về đồ điện tử
        </p>
      </div>

      <Suspense fallback={<div>Đang tải bài viết...</div>}>
        <BlogGrid />
      </Suspense>
    </div>
  );
}
