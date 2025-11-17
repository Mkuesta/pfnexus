import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Startup Marketplace | Connect Investors with AI Startups",
  description: "Two-sided marketplace connecting Private Equity firms and investors with high-quality AI startups. Deep AI-specific intelligence, deal-readiness scoring, and direct introductions.",
  keywords: ["AI startups", "private equity", "venture capital", "startup marketplace", "investment platform"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
