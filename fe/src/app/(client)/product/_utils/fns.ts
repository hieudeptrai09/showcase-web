import { ApiProduct } from "@/lib/api";

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const calculateAvgRating = (ratings: ApiProduct["ratings"]) => {
  if (ratings.length === 0) return 0;
  return (
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
  ).toFixed(1);
};
