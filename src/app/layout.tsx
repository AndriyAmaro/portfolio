import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Andri Amaro | Full Stack Developer",
  description:
    "Full Stack Developer especializado em React, Next.js, Node.js e PostgreSQL. Criador do Pulse Ecosystem · design system + 3 SaaS apps em producao.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Pulse Ecosystem",
    "Design System",
  ],
  authors: [{ name: "Andri Amaro" }],
  creator: "Andri Amaro",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Andri Amaro | Full Stack Developer",
    description:
      "Full Stack Developer · Criador do Pulse Ecosystem. Design system + 3 SaaS apps em producao.",
    siteName: "Andri Amaro Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andri Amaro | Full Stack Developer",
    description:
      "Full Stack Developer · Criador do Pulse Ecosystem. Design system + 3 SaaS apps em producao.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
