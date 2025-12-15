import { MapPin, Phone, Clock } from "lucide-react";
import DirectionsButton from "./DirectionsButton";
import ContactInfoItem from "./ContactInfoItem";

interface ShopInfo {
  address: string;
  phone: string;
  addressUrl: string;
}

interface ContactInfoCardProps {
  shopInfo: ShopInfo;
}

export default function ContactInfoCard({ shopInfo }: ContactInfoCardProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Thông tin liên hệ
        </h2>

        <div className="space-y-4">
          <ContactInfoItem
            icon={MapPin}
            label="Địa chỉ"
            content={shopInfo.address}
          />

          <ContactInfoItem
            icon={Phone}
            label="Điện thoại"
            content={shopInfo.phone}
          />

          <ContactInfoItem
            icon={Clock}
            label="Giờ mở cửa"
            content="Thứ 2 - Chủ nhật: 07:00 - 17:30"
          />
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <DirectionsButton addressUrl={shopInfo.addressUrl} />
        </div>
      </div>
    </div>
  );
}
