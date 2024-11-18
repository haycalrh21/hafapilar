import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Provider from "@/components/theme";
import Authprovider from "@/components/provider";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
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
    <html className={`${poppins.variable}`}>
      <Authprovider>
        <head>{/* Fonts are now loaded by next/font */}</head>
        {/* <Provider> */}
        <body>{children}</body>
      </Authprovider>
    </html>
  );
}
