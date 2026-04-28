import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LuxeWood Furniture",
  description: "Modern furniture for elegant living",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{
          backgroundColor: "#f5efe6",
        }}
      >
        {/* Global Header */}
        <Header title="LuxeWood Furniture" />

        {/* Page Content */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* Global Footer */}
        <Footer company="LuxeWood Furniture" />
      </body>
    </html>
  );
}