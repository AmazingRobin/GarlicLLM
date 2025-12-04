import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/NavBar/NavBar";
import { Footer } from "@/components/Footer/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        margin: 0,
        padding: 0
      }}>
        <TooltipProvider>
          <NavBar />
          <main style={{ flex: 1, width: '100%' }}>{children}</main>
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
