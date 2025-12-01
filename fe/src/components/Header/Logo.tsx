import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 shrink-0">
      <Image
        src="/DCHLogo.png"
        alt="CHIEN HOA ELECTRICITY"
        width={150}
        height={150}
      />
    </Link>
  );
}
