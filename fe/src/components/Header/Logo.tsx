import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 shrink-0">
      <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <ShoppingCart className="text-white" size={24} />
      </div>
      <span className="text-2xl font-bold text-primary hidden md:block">
        GameHub Store
      </span>
    </Link>
  );
}
