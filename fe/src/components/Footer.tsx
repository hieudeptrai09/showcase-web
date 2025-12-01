import Link from "next/link";
import { Facebook, MapPin, Phone } from "lucide-react";
import { shopInfo } from "@/lib/shopInfo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              {shopInfo.name}
            </h3>
            <p className="text-sm mb-4">{shopInfo.tagline}</p>
            <p className="text-sm">{shopInfo.description}</p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Thông tin liên hệ
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span className="text-sm">{shopInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <span className="text-sm">{shopInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Facebook size={18} className="flex-shrink-0" />
                <span className="text-sm">{shopInfo.facebook}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-white transition-colors"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/product"
                  className="text-sm hover:text-white transition-colors"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/maps"
                  className="text-sm hover:text-white transition-colors"
                >
                  Chỉ đường
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Mạng xã hội</h3>
            <div className="mt-6">
              <p className="text-sm text-gray-400">
                Giấy phép kinh doanh: {shopInfo.businessLicense}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Thành lập năm: {shopInfo.founded}
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} {shopInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
