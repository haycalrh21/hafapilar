import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Authprovider from "@/components/provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--poppins-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

const myFont = localFont({
  src: "./Poppins-Black.ttf",
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
      <Authprovider>
        <head>{/* Fonts are now loaded by next/font */}</head>
        {/* <Provider> */}
        <body>{children}</body>
      </Authprovider>
    </html>
  );
}
