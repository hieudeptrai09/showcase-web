import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { shopInfo } from "@/lib/shopInfo";

export default function HeroSection() {
  return (
    <section className="bg-blue-800 text-white">
      <div className="container-custom py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">{shopInfo.name}</h1>
          <p className="text-2xl mb-4">{shopInfo.tagline}</p>
          <p className="text-lg mb-8 text-blue-100">{shopInfo.description}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/product"
              className="btn-primary bg-white text-primary hover:bg-gray-100"
            >
              Xem sản phẩm
              <ArrowRight className="inline ml-2" size={20} />
            </Link>
            <Link
              href="/maps"
              className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
