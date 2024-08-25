import { Inter } from "next/font/google";
import "./globals.css";

import React from "react";
import Navbar from "@/components/common/Navbar/Navbar";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compify : Your Competitive AI Friend",
  description: "Compify is an AI friend that helps you with your competitive programming journey. It can help you with your doubts, provide you with resources, and even help you with your code.",
};


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