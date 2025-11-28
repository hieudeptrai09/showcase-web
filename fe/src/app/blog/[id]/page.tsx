import { notFound } from "next/navigation";
import BlogDetailClient from "@/components/BlogDetailClient";
import { fetchBlog } from "@/lib/api";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await fetchBlog(parseInt(id));

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
