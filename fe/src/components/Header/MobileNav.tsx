import Navigation from "./Navigation";

interface MobileNavProps {
  currentPath: string;
  isOpen: boolean;
  onLinkClick: () => void;
}

export default function MobileNav({
  currentPath,
  isOpen,
  onLinkClick,
}: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <Navigation
      className="lg:hidden mt-4 pb-4 flex flex-col space-y-3 border-t pt-4"
      currentPath={currentPath}
      onLinkClick={onLinkClick}
    />
  );
}
