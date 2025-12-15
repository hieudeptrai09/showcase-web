import type { Metadata } from "next";
import "./globals.css";
import { shopInfo } from "@/lib/shopInfo";

export const metadata: Metadata = {
  title: `${shopInfo.name} - ${shopInfo.tagline}`,
  description: `${shopInfo.description}`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
