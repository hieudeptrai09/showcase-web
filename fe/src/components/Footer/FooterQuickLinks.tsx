import Link from "next/link";
import { navLinks } from "@/lib/navigationInfo";
import FooterSection from "./FooterSection";

export default function FooterQuickLinks() {
  return (
    <FooterSection title="Liên kết nhanh">
      <ul className="space-y-2">
        {navLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-white hover:font-semibold transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
      </ul>
    </FooterSection>
  );
}
