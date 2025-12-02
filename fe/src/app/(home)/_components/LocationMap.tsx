import Link from "next/link";
import { MapPin } from "lucide-react";
import { shopInfo } from "@/lib/shopInfo";

export default function LocationMap() {
  return (
    <section className="container-custom py-16">
      <div className="flex items-center mb-8">
        <MapPin className="text-primary mr-2" size={32} />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Vị trí cửa hàng</h2>
          <p className="text-gray-600">{shopInfo.address}</p>
        </div>
      </div>
      <div
        className="bg-gray-200 rounded-lg overflow-hidden shadow-lg"
        style={{ height: "400px" }}
      >
        <iframe
          src={shopInfo.googleMapsUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div className="text-center mt-6">
        <Link href="/maps" className="btn-primary">
          Xem hướng dẫn chi tiết
        </Link>
      </div>
    </section>
  );
}
