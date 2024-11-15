import type { Metadata } from "next";
import { Fira_Sans, Libre_Franklin, Niramit } from "next/font/google";
import "./globals.css";

import Provider from "@/components/theme";

// Load Google Font Niramit using next/font
const niramit = Libre_Franklin({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
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
    <html lang="en">
      <head>{/* Fonts are now loaded by next/font */}</head>
      <Provider>
        <body className={`${niramit.className}`}>{children}</body>
      </Provider>
    </html>
  );
}
