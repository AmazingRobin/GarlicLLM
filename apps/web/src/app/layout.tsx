import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar/NavBar";
import { Footer } from "@/components/Footer/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GarlicLLM - AI Model Analysis & Visualization Hub",
  description: "Independent analysis and visualization platform for the rumored OpenAI Garlic model. Compare benchmarks, explore model architecture, and try interactive demos.",
  keywords: "Garlic LLM, OpenAI, AI Model, LLM Comparison, Transformer Visualization, AI Benchmarks",
  authors: [{ name: "GarlicLLM Team" }],
  metadataBase: new URL("https://garlicllm.com"),
  openGraph: {
    title: "GarlicLLM - AI Model Analysis & Visualization Hub",
    description: "Explore the rumored Garlic model through interactive 3D visualizations, benchmarks, and demos.",
    url: "https://garlicllm.com",
    siteName: "GarlicLLM",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GarlicLLM - AI Model Analysis Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GarlicLLM - AI Model Analysis & Visualization Hub",
    description: "Explore the rumored Garlic model through interactive 3D visualizations, benchmarks, and demos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen w-full m-0 p-0`}>
        <TooltipProvider>
          <NavBar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
