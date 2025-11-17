import Link from "next/link";
import { blogPosts } from "@/lib/data";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">
          Tin tức, hướng dẫn và kiến thức về gaming gear
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                {post.title}
              </h2>

              <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  {new Date(post.date).toLocaleDateString("vi-VN")}
                </div>
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  {post.author}
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              <Link
                href={`/blog/${post.id}`}
                className="text-primary hover:underline flex items-center font-semibold"
              >
                Đọc thêm
                <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
