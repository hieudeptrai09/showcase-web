import { notFound } from "next/navigation";
import BlogDetailClient from "@/components/BlogDetailClient";
import { fetchBlog } from "@/lib/api";

export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const blog = await fetchBlog(parseInt(params.id));

  if (!blog) {
    notFound();
  }

  return <BlogDetailClient blog={blog} />;
}
