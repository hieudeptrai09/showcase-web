import { navLinks } from "@/lib/navigationInfo";
import Link from "next/link";
import NavigationDropdown from "./NavigationDropdown";

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
  const isMobile = className.includes("flex-col");

  return (
    <nav className={className}>
      {navLinks.map((link) => {
        // Special handling for Products link
        if (link.href === "/product") {
          return (
            <NavigationDropdown
              key={link.href}
              isActive={currentPath === link.href}
              isMobile={isMobile}
              onLinkClick={onLinkClick}
            />
          );
        }

        // Regular navigation links
        return (
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
        );
      })}
    </nav>
  );
}
