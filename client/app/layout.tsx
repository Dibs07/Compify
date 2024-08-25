import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 cursor-auto`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
