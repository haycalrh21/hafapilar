import type { Metadata } from "next";

import "./globals.css";
import localFont from "next/font/local";
import Provider from "@/components/theme";
const myFont = localFont({
  src: "./font/font.otf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hafa Pilar",
  description: "Hafa Pilar Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={myFont.className}>
      <head>{/* Fonts are now loaded by next/font */}</head>
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
