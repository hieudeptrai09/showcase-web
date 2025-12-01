import { navLinks } from "@/lib/navigationInfo";
import Link from "next/link";

interface NavigationProps {
  currentPath: string;
  onLinkClick?: () => void;
  className?: string;
}

export default function Navigation({
  currentPath,
  onLinkClick,
  className = "",
}: NavigationProps) {
  return (
    <nav className={className}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-gray-700 hover:font-semibold ${
            currentPath === link.href && "text-primary"
          }`}
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
