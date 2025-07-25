import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PointerAI - Advanced Business Co-Pilot",
  description:
    "AI-powered business intelligence platform with fraud detection, sales forecasting, and automated budgeting",
  keywords:
    "AI, business intelligence, fraud detection, sales forecasting, budgeting",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-palantir-black text-palantir-light-gray-5 antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-palantir-black via-palantir-dark-gray-1 to-palantir-dark-gray-2">
          {children}
        </div>
      </body>
    </html>
  );
}
