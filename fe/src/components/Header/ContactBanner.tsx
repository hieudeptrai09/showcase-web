import { Phone, Mail } from "lucide-react";

export default function ContactBanner() {
  return (
    <div className="bg-primary text-white py-2">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm ml-auto">
          <span className="hidden md:inline">Liên hệ ngay:</span>
          <a
            href="tel:0397333667"
            className="flex items-center gap-1 hover:text-secondary transition-colors"
          >
            <Phone size={14} />
            <span>0397333667</span>
          </a>
          <a
            href="mailto:sharkkt@gmail.com"
            className="flex items-center gap-1 hover:text-secondary transition-colors"
          >
            <Mail size={14} />
            <span>sharkkt@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
