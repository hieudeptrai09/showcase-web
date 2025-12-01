import { shopInfo } from "@/lib/shopInfo";

export default function FooterCopyright() {
  return (
    <div className="border-t border-gray-800 mt-8 pt-8 text-center">
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} {shopInfo.name}. All rights reserved.
      </p>
    </div>
  );
}
