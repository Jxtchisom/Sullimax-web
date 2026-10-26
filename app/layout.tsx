import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Sullimax Diagnostics Centre | Yaba, Lagos",
  description: "Accurate clinical pathology, health checkups, and ultrasound scans in Yaba, Lagos.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-sullimax-canvas text-sullimax-navy font-sans antialiased flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}