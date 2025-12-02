"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, User, ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";
import { ApiBlog } from "@/lib/api";
import LikeAndDislike from "./LikeAndDislike";

interface BlogDetailClientProps {
  blog: ApiBlog;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const [likes, setLikes] = useState(blog.like);
  const [dislikes, setDislikes] = useState(blog.dislike);
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  const handleLike = () => {
    if (userVote === "like") {
      setLikes(likes - 1);
      setUserVote(null);
    } else {
      if (userVote === "dislike") {
        setDislikes(dislikes - 1);
      }
      setLikes(likes + 1);
      setUserVote("like");
    }
  };

  const handleDislike = () => {
    if (userVote === "dislike") {
      setDislikes(dislikes - 1);
      setUserVote(null);
    } else {
      if (userVote === "like") {
        setLikes(likes - 1);
      }
      setDislikes(dislikes + 1);
      setUserVote("dislike");
    }
  };

  return (
    <div className="container-custom py-12">
      <Link
        href="/blog"
        className="inline-flex items-center text-primary hover:underline mb-6"
      >
        <ArrowLeft size={20} className="mr-2" />
        Quay lại danh sách blog
      </Link>

      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-96 bg-gray-200 overflow-hidden">
          <img
            src={blog.heroImage || "https://via.placeholder.com/1200x600"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            {blog.title}
          </h1>

          <div className="flex items-center text-gray-500 mb-6 space-x-6">
            <div className="flex items-center">
              <Calendar size={20} className="mr-2" />
              {new Date(blog.date).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <User size={20} className="mr-2" />
              {blog.author}
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-8 pb-8">
            <LikeAndDislike
              likes={likes}
              userVote={userVote}
              handleLike={handleLike}
              handleDislike={handleDislike}
            />
          </div>

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="flex items-center space-x-4 mt-8 pt-8">
            <p className="text-gray-600 mr-4">Bài viết này có hữu ích không?</p>
            <LikeAndDislike
              likes={likes}
              userVote={userVote}
              handleLike={handleLike}
              handleDislike={handleDislike}
            />
          </div>
        </div>
      </article>

      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center text-primary hover:underline text-lg"
        >
          <ArrowLeft size={20} className="mr-2" />
          Xem thêm bài viết khác
        </Link>
      </div>
    </div>
  );
}
