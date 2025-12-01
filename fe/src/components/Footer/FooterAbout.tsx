import { shopInfo } from "@/lib/shopInfo";
import FooterSection from "./FooterSection";

export default function FooterAbout() {
  return (
    <FooterSection title={shopInfo.name}>
      <p className="text-sm mb-4">{shopInfo.tagline}</p>
      <p className="text-sm">{shopInfo.description}</p>
    </FooterSection>
  );
}
