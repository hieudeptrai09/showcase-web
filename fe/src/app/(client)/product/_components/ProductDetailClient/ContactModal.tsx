"use client";

import { Phone, Facebook, X } from "lucide-react";
import { shopInfo } from "@/lib/shopInfo";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Liên hệ với chúng tôi
        </h2>

        <div className="space-y-4">
          <a
            href={`tel:${shopInfo.phoneUrl}`}
            className="flex items-center justify-center gap-4 bg-blue-600 text-white px-6 py-6 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={onClose}
          >
            <Phone size={40} />
            <div className="text-left">
              <div className="text-sm opacity-90">Gọi điện</div>
              <div className="text-xl font-semibold">{shopInfo.phone}</div>
            </div>
          </a>

          <a
            href={shopInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-4 bg-green-600 text-white px-6 py-6 rounded-lg hover:bg-green-700 transition-colors"
            onClick={onClose}
          >
            <Facebook size={40} />
            <div className="text-left">
              <div className="text-sm opacity-90">Nhắn tin Facebook</div>
              <div className="text-lg font-semibold">Chiến Hòa</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
