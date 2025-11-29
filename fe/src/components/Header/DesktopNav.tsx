import Navigation from "./Navigation";

interface DesktopNavProps {
  currentPath: string;
}

export default function DesktopNav({ currentPath }: DesktopNavProps) {
  return (
    <Navigation
      className="hidden lg:flex items-center space-x-6"
      currentPath={currentPath}
    />
  );
}
