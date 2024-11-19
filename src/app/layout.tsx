import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import Authprovider from "@/components/provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
    <html>
      <Authprovider>
        <head>{/* Fonts are now loaded by next/font */}</head>
        {/* <Provider> */}
        <body className={`${poppins.variable}`}>{children}</body>
      </Authprovider>
    </html>
  );
}
