import { LucideIcon } from "lucide-react";

interface ContactInfoItemProps {
  icon: LucideIcon;
  label: string;
  content: string | React.ReactNode;
}

export default function ContactInfoItem({
  icon: Icon,
  label,
  content,
}: ContactInfoItemProps) {
  return (
    <div className="flex items-start">
      <Icon className="text-primary mr-3 shrink-0 mt-1" size={24} />
      <div>
        <p className="font-semibold text-gray-800 mb-1">{label}</p>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
}
