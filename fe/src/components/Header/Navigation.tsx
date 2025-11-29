import Link from "next/link";

interface NavLinkItem {
  href: string;
  label: string;
}

interface NavigationProps {
  currentPath: string;
  onLinkClick?: () => void;
  className?: string;
}

const navLinks: NavLinkItem[] = [
  { href: "/", label: "Trang chủ" },
  { href: "/about", label: "Giới thiệu" },
  { href: "/product", label: "Sản phẩm" },
  { href: "/blog", label: "Blog" },
  { href: "/maps", label: "Chỉ đường" },
];

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
          className={`text-gray-700 hover:text-secondary transition-colors ${
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
