import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Authprovider from "@/components/provider";
import { Inter, Roboto_Mono } from "next/font/google";
import Head from "next/head";

// export const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
// });

// export const roboto_mono = Roboto_Mono({
//   subsets: ["latin"],
//   display: "swap",
// });
// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--poppins-font",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   style: ["normal"],
// });

// const myFont = localFont({
//   src: "./Poppins-Black.ttf",
//   display: "swap",
// });

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
      <head>
        {/* Link font dari Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Signika:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Authprovider>{children}</Authprovider>
      </body>
    </html>
  );
}
