import { shopInfo } from "@/lib/shopInfo";
import { Phone, Facebook } from "lucide-react";

export default function ContactBanner() {
  return (
    <div className="bg-primary text-white py-2">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-4 text-base ml-auto">
          <span className="hidden md:inline">Liên hệ ngay:</span>
          <a
            href={`tel:${shopInfo.phoneUrl}`}
            className="flex items-center gap-1 hover:font-semibold"
          >
            <Phone size={18} />
          </a>
          <a
            href={shopInfo.facebook}
            className="flex items-center gap-1 hover:font-semibold"
          >
            <Facebook size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
