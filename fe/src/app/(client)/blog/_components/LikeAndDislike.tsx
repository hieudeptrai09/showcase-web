import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface LikeAndDislikeProps {
  likes: number;
  userVote: "like" | "dislike" | null;
  handleLike: () => void;
  handleDislike: () => void;
}

export default function LikeAndDislike({
  likes,
  userVote,
  handleLike,
  handleDislike,
}: LikeAndDislikeProps) {
  return (
    <>
      <button
        onClick={handleLike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          userVote === "like"
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-700 hover:bg-green-50"
        }`}
      >
        <ThumbsUp size={20} />
        <span className="font-semibold">{likes}</span>
      </button>
      <button
        onClick={handleDislike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
          userVote === "dislike"
            ? "bg-red-100 text-red-700"
            : "bg-gray-100 text-gray-700 hover:bg-red-50"
        }`}
      >
        <ThumbsDown size={20} />
      </button>
    </>
  );
}
