import { Inter } from "next/font/google";
import "./globals.css";

import React from "react";
import Navbar from "@/components/common/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className + "cursor-auto"}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}