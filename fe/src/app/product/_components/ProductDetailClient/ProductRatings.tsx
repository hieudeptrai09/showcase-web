import { Star } from "lucide-react";
import { ApiProduct } from "@/lib/api";

interface ProductRatingsProps {
  ratings: ApiProduct["ratings"];
}

export default function ProductRatings({ ratings }: ProductRatingsProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Đánh giá từ khách hàng
      </h2>
      {ratings.length > 0 ? (
        <div className="space-y-6">
          {ratings.map((rating) => (
            <div key={rating.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center mb-2">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < rating.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-800">
                  {rating.author}
                </span>
              </div>
              <p className="text-gray-600">{rating.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Chưa có đánh giá nào.</p>
      )}
    </div>
  );
}
