import { shopInfo } from "@/lib/shopInfo";
import FooterSection from "./FooterSection";

export default function FooterBusinessInfo() {
  return (
    <FooterSection title="Thông tin doanh nghiệp">
      <p className="text-sm mb-3 text-white">
        Giấy phép kinh doanh: {shopInfo.businessLicense}
      </p>
      <p className="text-sm text-white">Thành lập năm: {shopInfo.founded}</p>
    </FooterSection>
  );
}
