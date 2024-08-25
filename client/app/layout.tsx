import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compify",
  description: "A website that helps competitive exam aspirants by recommending mock exams based on selected subjects and chapters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-r from-gray-400 via-gray-300 to-gray-200 cursor-auto`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
