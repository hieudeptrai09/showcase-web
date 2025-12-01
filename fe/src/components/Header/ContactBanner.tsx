import { shopInfo } from "@/lib/shopInfo";
import { Phone, Facebook } from "lucide-react";

export default function ContactBanner() {
  return (
    <div className="bg-primary text-white py-2">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm ml-auto">
          <span className="hidden md:inline">Liên hệ ngay:</span>
          <a
            href={`tel:${shopInfo.phoneUrl}`}
            className="flex items-center gap-1 hover:font-semibold"
          >
            <Phone size={14} />
            <span>{shopInfo.phone}</span>
          </a>
          <a
            href={shopInfo.facebook}
            className="flex items-center gap-1 hover:font-semibold"
          >
            <Facebook size={14} />
            <span>{shopInfo.facebook}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
