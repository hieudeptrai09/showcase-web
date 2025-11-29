import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileMenuButton({
  isOpen,
  onClick,
}: MobileMenuButtonProps) {
  return (
    <button onClick={onClick} className="lg:hidden text-gray-700">
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );
}
