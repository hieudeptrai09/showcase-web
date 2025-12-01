import { Facebook, MapPin, Phone } from "lucide-react";
import { shopInfo } from "@/lib/shopInfo";
import FooterSection from "./FooterSection";

export default function FooterContact() {
  const contactItems = [
    {
      id: "address",
      icon: MapPin,
      content: shopInfo.address,
    },
    {
      id: "phone",
      icon: Phone,
      content: shopInfo.phone,
    },
    {
      id: "facebook",
      icon: Facebook,
      content: shopInfo.facebook,
    },
  ];

  return (
    <FooterSection title="Thông tin liên hệ">
      <div className="space-y-3">
        {contactItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-center space-x-2">
              <Icon size={18} className="shrink-0" />
              <span className="text-sm">{item.content}</span>
            </div>
          );
        })}
      </div>
    </FooterSection>
  );
}
